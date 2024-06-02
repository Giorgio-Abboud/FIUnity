from rest_framework import viewsets, permissions
from django.shortcuts import get_object_or_404
from .models import Profile, Experience, Project, Extracurricular
from .serializers import ProfileSerializer, ExperienceSerializer, ProjectSerializer, ExtracurricularSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Profile, user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        return {'owner': self.request.user.id}

    def get_queryset(self):
        username = self.request.GET.get('username')
        if username:
            profile = get_object_or_404(Profile, user__username=username)
            return Experience.objects.filter(user=profile.user)
        else:
            return Experience.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        return {'owner': self.request.user.id}

    def get_queryset(self):
        username = self.request.GET.get('username')
        if username:
            profile = get_object_or_404(Profile, user__username=username)
            return Project.objects.filter(user=profile.user)
        else:
            return Project.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExtracurricularViewSet(viewsets.ModelViewSet):
    queryset = Extracurricular.objects.all()
    serializer_class = ExtracurricularSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        return {'owner': self.request.user.id}

    def get_queryset(self):
        username = self.request.GET.get('username')
        if username:
            profile = get_object_or_404(Profile, user__username=username)
            return Extracurricular.objects.filter(user=profile.user)
        else:
            return Extracurricular.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
