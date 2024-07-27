from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Profile, Experience, Project, Extracurricular
from .serializers import *
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication

# View for the profile
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)  # Save the logged-in user
        return Response(serializer.data)

# View for the experience
class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    # this method explicitly is for update
    def put(self, request, pk, *args, **kwargs):
        return self.update(request, pk, *args, **kwargs)

# View for projects
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    # this method explicitly is for update
    def put(self, request, pk, *args, **kwargs):
        return self.update(request, pk, *args, **kwargs)

# View for extracurriculars
class ExtracurricularViewSet(viewsets.ModelViewSet):
    queryset = Extracurricular.objects.all()
    serializer_class = ExtracurricularSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]   

    # this method explicitly is for update
    def put(self, request, pk, *args, **kwargs):
        return self.update(request, pk, *args, **kwargs)

# View for skills
class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillsSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    # this method explicitly is for update
    def put(self, request, pk, *args, **kwargs):
        return self.update(request, pk, *args, **kwargs)
    