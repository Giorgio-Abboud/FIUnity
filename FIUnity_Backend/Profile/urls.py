# Profile/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profiles', views.ProfileViewSet)
router.register(r'experiences', views.ExperienceViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'extracurriculars', views.ExtracurricularViewSet)
router.register(r'skills', views.SkillViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Custom base URL endpoint
]
