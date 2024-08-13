import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from Profile.models import Project, Experience, Organization, Skill, StandaloneSkill, Extracurricular
from Profile.serializers import Profile
from Authentication.models import AppUser

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user():
    user = AppUser.objects.create_user(
        email="testuser@example.com",
        password="strongpassword123",
        first_name="Test",
        last_name="User",
        PID="1234567",
        graduation_year=2025,
        grad_term="Spring"
    )
    Profile.objects.create(user=user)  # Ensure a profile is created
    return user


@pytest.fixture
def create_organization():
    return Organization.objects.create(
        name="Test Organization",
        type="Company"
    )

@pytest.fixture
def create_skill(create_user):
    return Skill.objects.create(
        user=create_user,
        skill_name="Django"
    )

@pytest.mark.django_db
def test_create_project(api_client, create_user, create_organization, create_skill):
    api_client.force_authenticate(user=create_user)
    
    data = {
        "project": create_organization.id,
        "description": "A project description",
        "skills": [create_skill.id]
    }
    
    url = reverse('projects')  # Adjust the URL name as per your URLConf
    response = api_client.post(url, data, format='json')
    
    assert response.status_code == status.HTTP_201_CREATED
    assert Project.objects.count() == 1
    assert Project.objects.get().description == "A project description"

@pytest.mark.django_db
def test_update_project(api_client, create_user, create_organization, create_skill):
    api_client.force_authenticate(user=create_user)
    
    # Creating an initial project
    project = Project.objects.create(
        user=create_user,
        project=create_organization,
        description="Old description"
    )
    
    # Updating only the description
    data = {
        "description": "Updated description"
    }
    
    url = reverse('single-projects', args=[project.id])
    response = api_client.patch(url, data, format='json')  # PATCH instead of PUT
    
    assert response.status_code == status.HTTP_200_OK
    assert Project.objects.get().description == "Updated description"


@pytest.mark.django_db
def test_create_experience(api_client, create_user, create_organization):
    api_client.force_authenticate(user=create_user)
    
    data = {
        "job_position": "Software Engineer",
        "company": create_organization.id,
        "job_type": "Full-time",
        "start_date": "2023-01-01",
        "end_date": "2023-06-01",
        "currently_working": False
    }
    
    url = reverse('experiences')  # Adjust the URL name as per your URLConf
    response = api_client.post(url, data, format='json')
    
    assert response.status_code == status.HTTP_201_CREATED
    assert Experience.objects.count() == 1
    assert Experience.objects.get().job_position == "Software Engineer"

@pytest.mark.django_db
def test_invalid_experience_date(api_client, create_user, create_organization):
    api_client.force_authenticate(user=create_user)
    
    data = {
        "job_position": "Software Engineer",
        "company": create_organization.id,
        "job_type": "Full-time",
        "start_date": "2023-01-01",
        "end_date": "2022-12-31",  # Invalid: end date before start date
        "currently_working": False
    }
    
    url = reverse('experiences')  # Adjust the URL name as per your URLConf
    response = api_client.post(url, data, format='json')
    
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "End date should be greater than starting date" in str(response.data)

@pytest.mark.django_db
def test_create_standalone_skill(api_client, create_user):
    api_client.force_authenticate(user=create_user)
    
    url = reverse('skills')  # Adjust URL name if needed
    data = {
        "skill_name": "Python",
    }
    
    response = api_client.post(url, data, format='json')
    
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['skill_name'] == "Python"
    assert StandaloneSkill.objects.count() == 1

@pytest.mark.django_db
def test_list_standalone_skills(api_client, create_user):
    api_client.force_authenticate(user=create_user)
    
    StandaloneSkill.objects.create(user=create_user, skill_name="Django", is_standalone=True)
    
    url = reverse('skills')  # Adjust URL name if needed
    response = api_client.get(url, format='json')
    
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]['skill_name'] == "Django"

@pytest.mark.django_db
def test_delete_standalone_skill(api_client, create_user):
    api_client.force_authenticate(user=create_user)
    
    skill = StandaloneSkill.objects.create(user=create_user, skill_name="React", is_standalone=True)
    url = reverse('single-skill', args=[skill.id])  # Adjust URL name if needed
    
    response = api_client.delete(url, format='json')
    
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert StandaloneSkill.objects.count() == 0

@pytest.mark.django_db
def test_create_extracurricular(api_client, create_user):
    api_client.force_authenticate(user=create_user)
    
    # Create a sample Organization instance to use for the test
    organization = Organization.objects.create(name="Local Charity", type="Extra")
    
    url = reverse('extracurriculars')  # Ensure this URL is correct
    data = {
        "extracurricular": organization.id,  # Use the ID of the Organization instance
        "description": "Volunteer Work",
        "tagline": "Volunteer at Local Charity",
    }

    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert Extracurricular.objects.count() == 1
    assert Extracurricular.objects.get().description == "Volunteer Work"

@pytest.mark.django_db
def test_retrieve_extracurricular(api_client, create_user):
    api_client.force_authenticate(user=create_user)
    
    # Create a sample Organization instance
    organization = Organization.objects.create(name="Local Charity", type="Extra")
    
    # Create an Extracurricular instance
    extracurricular = Extracurricular.objects.create(
        user=create_user,
        extracurricular=organization,
        description="Volunteer Work",
    )
    
    url = reverse('single-extracurriculars', args=[extracurricular.id])  # Adjust URL name if needed

    response = api_client.get(url, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert response.data['description'] == "Volunteer Work"
    assert response.data['tagline'] == "Extracurricular: Local Charity"

@pytest.mark.django_db
def test_update_extracurricular(api_client, create_user):
    api_client.force_authenticate(user=create_user)
    
    # Create a sample Organization instance to use for the test
    organization = Organization.objects.create(name="High School", type="Extra")
    
    # Create an Extracurricular instance
    extracurricular = Extracurricular.objects.create(
        user=create_user,
        extracurricular=organization,
        description="Sports Team",
    )
    
    url = reverse('single-extracurriculars', args=[extracurricular.id])  # Adjust URL name if needed
    data = {
        "description": "Captain",  # Update the tagline
    }
    
    response = api_client.patch(url, data, format='json')
    
    assert response.status_code == status.HTTP_200_OK
    assert Extracurricular.objects.get(id=extracurricular.id).description == "Captain"


@pytest.mark.django_db
def test_create_project_with_skills(api_client, create_user, create_skill):
    api_client.force_authenticate(user=create_user)
    
    url = reverse('projects')  # Ensure this URL is correct
    data = {
        "project": "Projecto",  # Use an ID for the Organization field if needed
        "description": "A project involving web development",
        "skills": [create_skill.id],
    }
    
    response = api_client.post(url, data, format='json')
    
    assert response.status_code == status.HTTP_201_CREATED
    assert Project.objects.count() == 1
    project = Project.objects.get()
    assert project.description == "A project involving web development"
    assert len(project.skills.all()) == 1
    assert project.skills.first().id == create_skill.id

@pytest.mark.django_db
def test_update_project_with_skills(api_client, create_user, create_skill):
    api_client.force_authenticate(user=create_user)
    
    # Create a sample Organization instance to use for the test
    organization = Organization.objects.create(name="Tech Corp", type="Company")
    
    # Create a Project instance
    project = Project.objects.create(
        user=create_user,
        project=organization,
        description="Initial description",
    )
    
    url = reverse('single-projects', args=[project.id])  # Adjust URL name if needed
    
    # Update project data including skills
    data = {
        "description": "Updated description for the project",
        "skills": [create_skill.id]  # Update with skill IDs
    }
    
    response = api_client.patch(url, data, format='json')
    
    assert response.status_code == status.HTTP_200_OK
    updated_project = Project.objects.get(id=project.id)
    assert updated_project.description == "Updated description for the project"
    assert updated_project.skills.count() == 1
    assert updated_project.skills.first().id == create_skill.id
