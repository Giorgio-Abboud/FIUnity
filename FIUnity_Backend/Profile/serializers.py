from rest_framework import serializers
from .models import Profile, Experience, Project, Extracurricular, Skill

# This serializer is for displaying all the details of a profile for a particular user
class ProfileSerializer(serializers.ModelSerializer):
    is_alumni = serializers.ReadOnlyField(source='user.is_alumni')
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')
    graduation_year = serializers.ReadOnlyField(source='user.grad_year')

    class Meta:
        model = Profile
        fields = ['id', 'user', 'first_name', 'middle_name', 'last_name', 'grad_term', 
                  'graduation_year', 'class_standing', 'major', 'career_interest', 
                  'picture', 'resume', 'about', 'is_alumni']
        read_only_fields = ['user', 'first_name', 'last_name', 'is_alumni', 'graduation_year']

# This serializer is for displaying experience information of the user.
class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"

# This serializer is for displaying all the details of projects of particular users
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

# This serializer is for displaying all the details of extracurricular activities
class ExtracurricularSerializer(serializers.ModelSerializer):
    class Meta:
        model = Extracurricular
        fields = "__all__"

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"