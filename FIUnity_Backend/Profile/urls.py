from django.urls import path
from Profile.views import *

urlpatterns = [
    path('organization/', OrganizationView.as_view()),
    path('myorganization/', MyOrganizationView.as_view()),
    
    # Extracurricular URLs
    path('extracurricular/', ExtracurricularView.as_view()), # For listing and creating extracurriculars (POST, GET)
    path('extracurricular/<int:pk>/', SingleExtracurricularView.as_view()), # For retrieving, updating, and deleting a specific extracurricular (pk = post id) (PATCH, DELETE, GET)
    
    # Experience URLs
    path('experience/', ExperienceView.as_view()),  # For listing and creating experiences
    path('experience/<int:pk>/', SingleExperienceView.as_view()),  # For retrieving, updating, and deleting a specific experience
    
    # Project URLs
    path('project/', ProjectView.as_view()),  # For listing and creating projects (POST, GET)
    path('project/<int:pk>/', SingleProjectView.as_view()),  # For retrieving, updating, and deleting a specific project
    
    # Skill URLs
    path('user_skill/<int:pk>/', UserSkillsView.as_view()),  # For retrieving, updating, and deleting user skills
    path('project_skill/<int:pk>/', ProjectSkillsView.as_view()),  # For retrieving, updating, and deleting project skills
    
    # Other URLs
    path('userprofile/', UserProfileView.as_view()),  # For retrieving and updating user profile
    path('mainpage/', MainPageView.as_view()),  # For retrieving main page data
    path('search/', MainProfileSearchView.as_view()),  # For search functionality
]
