from django.urls import path
from Profile.views import *

urlpatterns = [
    path('organization/', OrganizationView.as_view()), # No need
    path('myorganization/', MyOrganizationView.as_view()), # No need
    
    # Extracurricular URLs
    path('extracurriculars/', ExtracurricularView.as_view(), name='extracurriculars'), # For listing and creating extracurriculars (POST, GET)
    path('extracurriculars/<int:pk>/', SingleExtracurricularView.as_view(), name='single-extracurriculars'), # For retrieving, updating, and deleting a specific extracurricular (pk = post id) (PATCH, DELETE, GET)
    
    # Experience URLs
    path('experiences/', ExperienceView.as_view(), name='experiences'),  # For listing and creating experiences (POST, GET)
    path('experiences/<int:pk>/', SingleExperienceView.as_view(), name='single-experiences'),  # For retrieving, updating, and deleting a specific experience (PATCH, DELETE, GET)
    
    # Project URLs
    path('projects/', ProjectView.as_view(), name='projects'), # For listing and creating projects (POST, GET)
    path('projects/<int:pk>/', SingleProjectView.as_view(), name='single-projects'), # For retrieving, updating, and deleting a specific project (PATCH, DELETE, GET)
    
    # Skill URLs
    path('skills/', UserSkillsView.as_view(), name='skills'), # For retrieving, updating, and deleting user skills (POST, GET)
    path('skills/<int:pk>/', SingleUserSkillsView.as_view(), name='single-skill'), # For retrieving, and deleting project skills (DELETE, GET)
    
    # Profile URLs
    path('userprofile/', UserProfileView.as_view()), # For retrieving and updating user profile (GET)
    path('usermainpage/<int:pk>/', ProfileDetailView.as_view(), name='profile-detail'), # For Retrieving a single profile (GET)
    path('mainpage/', MainPageView.as_view(), name='mainpage'), # For retrieving main page data
    path('search/', MainProfileSearchView.as_view()), # For search functionality
]
