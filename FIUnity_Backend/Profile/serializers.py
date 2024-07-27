from rest_framework import serializers, status
from .models import *
from Authentication.utils import CustomValidation
from django.shortcuts import get_object_or_404
from django.db.utils import IntegrityError

# This is the helper serializer that keeps the models organized
class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = "__all__"

# This serializer is for displaying experience information of the user.
class ExperienceSerializer(serializers.ModelSerializer):
    company_data = OrganizationSerializer(source="company", read_only=True)

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

# This serializer is for displaying all the details of a profile for a particular user
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
