from rest_framework import serializers
from .models import Profile, Experience, Project, Extracurricular

# This serializer is for displaying all the details of a profile for a particular user
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"

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
