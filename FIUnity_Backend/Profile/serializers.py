from rest_framework import serializers, status
from .models import *
from Authentication.utils import CustomValidation
from django.db.utils import IntegrityError

# This is the helper serializer that keeps the models organized
class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = "__all__"

# This serializer is for the creation and validation of the exeprience model
class ExperienceSerializer(serializers.ModelSerializer):
    company_data = OrganizationSerializer(source="company", read_only=True)

    class Meta:
        model = Experience
        exclude = ['tagline']
        extra_kwargs = {'company': {'required': True},
                        'currently_working': {'required': True},}
    
    def validate(self, attrs):
        try:
            if attrs['currently_working'] is True:
                attrs['end_date'] = None
            else:
                try:
                    end_date = attrs['end_date']
                except:
                    raise CustomValidation(detail="If currently_working is False, please provide end date",
                                                field= "error",
                                                status_code=status.HTTP_406_NOT_ACCEPTABLE)
                if attrs[('start_date')] > end_date:
                    raise CustomValidation(detail="End date should be greater than starting date",
                                            field= "error",
                                            status_code=status.HTTP_406_NOT_ACCEPTABLE)
        except KeyError:
            pass
        return super().validate(attrs)
    
    def create(self, validated_data):
        experience = super().create(validated_data)
        main_profile = MainProfile.objects.update_or_create(profile = validated_data['user'].profile)
        print(Experience.objects.filter(user = validated_data['user']).order_by('-start_date')[0])
        main_profile[0].current_company = Experience.objects.filter(user = validated_data['user']).order_by('-start_date')[0]
        main_profile[0].save()
        return experience

# Serializer used to update a single instance of an experience model
class SingleExperienceSerializer(serializers.ModelSerializer):
    company_data = OrganizationSerializer(source = "company",read_only = True)

    class Meta:
        model = Experience
        exclude = ['tagline']
        extra_kwargs = {'company': {'required': True},
                        'currently_working': {'required': True},}
        
    def update(self, instance, validated_data):
        try:
            return super().update(instance, validated_data)
        except IntegrityError:
            raise CustomValidation(detail="End date should be greater than starting date",
                                    field= "error",
                                    status_code=status.HTTP_406_NOT_ACCEPTABLE)

# Serializer used to list experience instances
class ShortExperienceSerializer(serializers.ModelSerializer):
    company_data = OrganizationSerializer(source="company", read_only=True)
    
    class Meta:
        model = Experience
        fields = ['tagline', 'company', 'company_data']
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['organization'] = data.pop('company')
        return data

# This serializer is for the creation and validation of the project model
class ProjectSerializer(serializers.ModelSerializer):
    project_data = OrganizationSerializer(source="project", read_only=True)

    class Meta:
        model = Project
        exclude = ['tagline']
        extra_kwargs = {
            'project': {'required': True},
            'description': {'required': True},
        }

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop('user', None)
        data['user'] = instance.user.id
        skills = instance.skills.all()
        skill_names = [skill.skill_name for skill in skills]
        data['skills'] = skill_names
        return data

    def create(self, validated_data):
        skills_data = validated_data.pop('skills', [])
        user = self.context['request'].user
        
        # Remove 'user' key if it exists in validated_data
        validated_data.pop('user', None)
        
        # Create the project without the 'user' key in validated_data
        project = Project.objects.create(user=user, **validated_data)

        for skill_data in skills_data:
            skill, created = Skill.objects.get_or_create(
                user=user, skill_name=skill_data
            )
            project.skills.add(skill)
        
        main_profile, created = MainProfile.objects.update_or_create(
            profile=user.profile,
            defaults={'current_project': project}
        )
        
        return project

# Serializer used to update a single instance of an project model
class SingleProjectSerializer(serializers.ModelSerializer):
    project_data = OrganizationSerializer(source="project", read_only=True)

    class Meta:
        model = Project
        exclude = ['tagline']
        extra_kwargs = {
            'project': {'required': True},
            'description': {'required': True},
        }

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop('user', None)
        data['user'] = instance.user.id

        # Convert skill IDs to skill names
        skills = instance.skills.all()
        skill_names = [skill.skill_name for skill in skills]
        data['skills'] = skill_names

        return data

    def to_internal_value(self, data):
        # Convert skill names to Skill instances
        skills_data = data.get('skills', [])
        skill_ids = []
        user = self.context['request'].user

        for skill in skills_data:
            if isinstance(skill, str):  # If it's a skill name
                skill_instance, created = Skill.objects.get_or_create(skill_name=skill, user=user)
                skill_ids.append(skill_instance.pk)
            elif isinstance(skill, int):  # If it's an ID
                skill_ids.append(skill)
            else:
                raise serializers.ValidationError({"skills": "Invalid skill format"})

        data['skills'] = skill_ids

        # Convert project names to Organization instances
        project = data.get('project')
        if isinstance(project, str):  # If it's a project name
            organizations = Organization.objects.filter(name=project, type='Project')
            if organizations.exists():
                data['project'] = organizations.first().pk
            else:
                raise serializers.ValidationError({"project": "Project not found"})
        elif isinstance(project, int):  # If it's an ID
            data['project'] = project
        else:
            raise serializers.ValidationError({"project": "Invalid project format"})

        return super().to_internal_value(data)

    def update(self, instance, validated_data):
        skill_ids = validated_data.pop('skills', [])
        instance = super().update(instance, validated_data)

        # Update the skills
        instance.skills.set(skill_ids)

        # Update or create the main profile
        main_profile, created = MainProfile.objects.update_or_create(
            profile=instance.user.profile,
            defaults={'current_project': instance}
        )
        
        return instance

# Serializer used to list project instances
class ShortProjectSerializer(serializers.ModelSerializer):
    project_data = OrganizationSerializer(source = "project", read_only = True)
    
    class Meta:
        model = Project
        fields = ['tagline', 'project', 'project_data']
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['organization'] = data.pop('project')
        return data

# This serializer is to handle the skill model 
class SkillSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Skill
        fields = ['id', 'skill_name']

    def to_representation(self, instance):
        data = super().to_representation(instance)
                
        return data

# This serializer is to handle the standalone skill model  
class StandaloneSkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = StandaloneSkill
        fields = ['id', 'skill_name', 'is_standalone']

# This serializer is for the creation and validation of the extracurricular model
class ExtracurricularSerializer(serializers.ModelSerializer):
    extracurricular_data = OrganizationSerializer(source="extracurricular", read_only=True)

    class Meta:
        model = Extracurricular
        fields = ['id', 'user', 'extracurricular', 'description', 'tagline', 'extracurricular_data']
        extra_kwargs = {
            'extracurricular': {'required': True},
        }

    def create(self, validated_data):
        extracurricular = super().create(validated_data)
        return extracurricular

    def to_internal_value(self, data):
        if isinstance(data.get('extracurricular'), str):
            extracurricular_name = data.pop('extracurricular')
            extracurriculars = Organization.objects.filter(name=extracurricular_name, type='Extra')
            if extracurriculars.exists():
                extracurricular = extracurriculars.first()
            else:
                extracurricular = Organization.objects.create(name=extracurricular_name, type='Extra')
            data['extracurricular'] = extracurricular.id
        return super().to_internal_value(data)

# Serializer used to update a single instance of an extracurricular model
class SingleExtracurricularSerializer(serializers.ModelSerializer):
    extra_data = OrganizationSerializer(source = "extra", read_only = True)

    class Meta:
        model = Extracurricular
        exclude = ['tagline']
        extra_kwargs = {'extracurricular': {'required': True},}

    def update(self, instance, validated_data):
        try:
            return super().update(instance, validated_data)
        except IntegrityError:
            raise CustomValidation(detail="Not enough data provided",
                                    field= "error",
                                    status_code=status.HTTP_406_NOT_ACCEPTABLE)

# Serializer used to list extracurricular instances
class ShortExtracurricularSerializer(serializers.ModelSerializer):
    extra_data = OrganizationSerializer(source = "extra", read_only = True)
    
    class Meta:
        model = Extracurricular
        fields = ['tagline', 'extracurricular', 'extra_data']
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['organization'] = data.pop('extra')
        return data

# Serializer used to create the search user functionality by formatting profile data
class ProfileSearchSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        exclude = ['id']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data

# Serializer used to create the profile
class ProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        fields = '__all__'

    def get_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

# Serializer used to make the main page for the profile
class MainPageSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only = True)
    # current_company = ShortExperienceSerializer(read_only = True)
    # current_extra = ShortExtracurricularSerializer(read_only = True)
    # current_project = ShortProjectSerializer(read_only = True)
    # full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = MainProfile
        exclude = ['id']

    def get_full_name(self, obj):
        return obj.profile.full_name()

    def to_representation(self, instance):
        data = super().to_representation(instance)
        
        user = instance.profile.user
        experience_data = Experience.objects.filter(user=instance.profile.user)[:2]
        extra_data = Extracurricular.objects.filter(user=instance.profile.user)[:2]
        project_data = Project.objects.filter(user=instance.profile.user).order_by('-id')[:1]
        skill_data = StandaloneSkill.objects.filter(user=instance.profile.user)[:3]
        
        data['experience_data'] = SingleExperienceSerializer(instance=experience_data, many=True).data
        data['extra_data'] = SingleExtracurricularSerializer(instance=extra_data, many=True).data
        data['project_data'] = SingleProjectSerializer(instance=project_data, many=True).data
        data['skill_data'] = StandaloneSkillSerializer(instance=skill_data, many=True).data

        return data
