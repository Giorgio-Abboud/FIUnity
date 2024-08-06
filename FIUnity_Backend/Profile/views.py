from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status, filters
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import *
from rest_framework.views import APIView

class ExtracurricularView(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ExtracurricularSerializer

    def get_queryset(self):
        email = self.request.GET.get('email')
        if email:
            profile = get_object_or_404(Profile, email=email)
        else:
            profile = self.request.user.profile

        return Extracurricular.objects.filter(user=profile.user)

    def post(self, request, *args, **kwargs):
        request.data.update({"user": request.user.id})
        try:
            return super().post(request, *args, **kwargs)
        except Exception as e:
            return Response({"detail": f"{e}"}, status=status.HTTP_400_BAD_REQUEST)

class SingleExtracurricularView(RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ExtracurricularSerializer

    def get_queryset(self):
        return Extracurricular.objects.filter(user=self.request.user)

    def patch(self, request, *args, **kwargs):
        request.data.update({"user": request.user.id})
        try:
            return super().patch(request, *args, **kwargs)
        except Exception as e:
            return Response({"detail": f"{e}"}, status=status.HTTP_400_BAD_REQUEST)
    
class ExperienceView(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ExperienceSerializer

    def get_queryset(self):
        return Experience.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        request.data.update({"user": request.user.id})
        try:
            company = request.data.get('company')
            if not isinstance(company, int):
                new_company = Organization.objects.create(name=company, type='Company')
                request.data['company'] = new_company.id
        except KeyError:
            pass

        return super().post(request, *args, **kwargs)
    
class SingleExperienceView(RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = SingleExperienceSerializer

    def get_queryset(self):
        return Experience.objects.filter(user=self.request.user)

    def put(self, request, *args, **kwargs):
        request.data.update({"user": request.user.id})
        try:
            company = request.data.get('company')
            if not isinstance(company, int):
                new_company = Organization.objects.create(name=company, type='Company')
                request.data['company'] = new_company.id
        except KeyError:
            pass
        return super().put(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        request.data.update({"user": request.user.id})
        try:
            company = request.data.get('company')
            if not isinstance(company, int):
                new_company = Organization.objects.create(name=company, type='Company')
                request.data['company'] = new_company.id
        except KeyError:
            pass
        return super().patch(request, *args, **kwargs)

class ProjectView(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProjectSerializer
    
    def get_serializer_context(self):
        return {
            'request': self.request,
        }

    def get_queryset(self):
        email = self.request.GET.get('email')
        
        if email:
            profile = get_object_or_404(Profile, email=email)
        else:
            profile, created = Profile.objects.get_or_create(user=self.request.user)
        
        return Project.objects.filter(user=profile.user)

    def post(self, request, *args, **kwargs):
        request.data.update({"user": request.user.id})
        
        # Handle skills
        skills_data = request.data.get('skills', [])
        skill_ids = []
        if skills_data:
            for skill_name in skills_data:
                if isinstance(skill_name, int):
                    # Check if the skill ID already exists
                    if Skill.objects.filter(id=skill_name, user=request.user).exists():
                        skill_ids.append(skill_name)
                else:
                    # Create or get the skill if it's not an integer ID
                    # Use a unique constraint to avoid duplicates
                    skill = Skill.objects.filter(skill_name=skill_name, user=request.user).first()
                    if not skill:
                        skill = Skill.objects.create(
                            skill_name=skill_name, 
                            user=request.user
                        )
                    skill_ids.append(skill.id)
            request.data['skills'] = skill_ids

        # Handle project organization
        project = request.data.get('project')
        if project and not isinstance(project, int):
            new_project = Organization.objects.create(
                name=project, 
                type='Project'
            )
            request.data['project'] = new_project.id
        
        return super().post(request, *args, **kwargs)

class SingleProjectView(RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = SingleProjectSerializer
    
    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)

    def patch(self, request, *args, **kwargs):
        request.data.update({"user": request.user.id})
        try:
            return super().patch(request, *args, **kwargs)
        except Exception as e:
            return Response({"detail": f"{e}"}, status=status.HTTP_400_BAD_REQUEST)
    
class UserSkillsView(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = StandaloneSkillSerializer

    def get_queryset(self):
        user = self.request.user
        return StandaloneSkill.objects.filter(user=user, is_standalone=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, is_standalone=True)

class SingleUserSkillsView(RetrieveDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = StandaloneSkillSerializer

    def get_queryset(self):
        user = self.request.user
        return StandaloneSkill.objects.filter(user=user)

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)

class UserProfileView(CreateAPIView,RetrieveUpdateAPIView):
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    
    def get_object(self):
        return get_object_or_404(Profile, user = self.request.user)
            
    def post(self, request, *args, **kwargs):
        request.data.update({"user" : request.user.id})
        try:
            return super().post(request, *args, **kwargs)
        except Exception as e:
            return Response({"detail": f"{e}"}, status= status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        request.data.update({"user" : request.user.id})
        try:
            return super().patch(request, *args, **kwargs)
        except Exception as e:
            return Response({"detail": f"{e}"}, status= status.HTTP_400_BAD_REQUEST)

class OrganizationView(ListAPIView):
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = OrganizationSerializer
    
    queryset = Organization.objects.filter(registered = True)
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'type']
    
class MyOrganizationView(APIView):
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        extra = Extracurricular.objects.filter(user = self.request.user)
        experience = Experience.objects.filter(user = self.request.user)
        project = Project.objects.filter(user = self.request.user)
        extra_data = ShortExtracurricularSerializer(instance=extra, many = True).data
        experience_data = ShortExperienceSerializer(instance = experience, many=True).data
        project_data = ShortProjectSerializer(instance = project, many=True).data
        return Response({"my_organizations" : extra_data + experience_data + project_data})

class MainPageView(RetrieveUpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = MainPageSerializer

    def get_object(self):
        user = self.request.user
        email = self.request.GET.get('email')

        if email:
            profile = get_object_or_404(Profile, email=email)
        else:
            profile, created = Profile.objects.get_or_create(user=user)

        main_profile, created = MainProfile.objects.get_or_create(profile=profile)
        return main_profile

class MainProfileSearchView(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSearchSerializer
    
    queryset = Profile.objects.all()
    filter_backends = [filters.SearchFilter] 
    search_fields = ['first_name', 'last_name', 'email', 'grad_term',
                    'graduation_year', 'major', 'career_interest']
    
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user  # Pass user in context
        return context
    
class ProfileDetailView(RetrieveAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Profile.objects.all()
    serializer_class = MainPageSerializer
    
    def get_object(self):
        profile_id = self.kwargs['pk']
        profile = get_object_or_404(Profile, pk=profile_id)
        main_profile = get_object_or_404(MainProfile, profile=profile)
        return main_profile
