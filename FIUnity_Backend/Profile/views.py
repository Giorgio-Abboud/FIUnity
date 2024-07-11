from rest_framework import viewsets
from .models import Profile, Experience, Project, Extracurricular
from .serializers import ProfileSerializer, ExperienceSerializer, ProjectSerializer, ExtracurricularSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication

# View for the profile
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Profile.objects.filter(user=user)
        return Profile.objects.none()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# View for the experience
class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

# View for projects
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

# View for extracurriculars
class ExtracurricularViewSet(viewsets.ModelViewSet):
    queryset = Extracurricular.objects.all()
    serializer_class = ExtracurricularSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]    
