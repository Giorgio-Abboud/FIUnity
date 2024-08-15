import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from Authentication.models import AppUser
from Jobs.models import JobPosting
from datetime import date
from rest_framework_simplejwt.tokens import RefreshToken

@pytest.mark.django_db
def test_get_job_postings():
    client = APIClient()
    user = AppUser.objects.create_user(
        email="testuser@example.com",
        password="password123",
        first_name="John",
        last_name="Doe",
        PID="1234567",
        graduation_year=2024,
        grad_term="Fall"
    )
    
    # Generate JWT token
    refresh = RefreshToken.for_user(user)
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    response = client.get(reverse('job-posting'))
    assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
def test_create_job_posting():
    client = APIClient()
    user = AppUser.objects.create_user(
        email="testuser@example.com",
        password="password123",
        first_name="John",
        last_name="Doe",
        PID="1234567",
        graduation_year=2024,
        grad_term="Fall"
    )
    
    # Generate JWT token
    refresh = RefreshToken.for_user(user)
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    data = {
        "jobPosition": "Software Engineer",
        "jobID": "SE123",
        "companyName": "TechCorp",
        "jobDescription": "Develop software solutions.",
        "salary": "100000",
        "type": "Full-Time",
        "mode": "Remote",
        "startDate": date.today(),
        "usWorkAuthorization": True,
        "usCitizenship": False,
        "usResidency": True,
        "applicationLink": "https://techcorp.com/apply"
    }

    response = client.post(reverse('job-posting'), data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['jobPosition'] == "Software Engineer"
    assert response.data['companyName'] == "TechCorp"

@pytest.mark.django_db
def test_delete_job_posting():
    client = APIClient()
    user = AppUser.objects.create_user(
        email="testuser@example.com",
        password="password123",
        first_name="John",
        last_name="Doe",
        PID="1234567",
        graduation_year=2024,
        grad_term="Fall"
    )
    
    # Generate JWT token
    refresh = RefreshToken.for_user(user)
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    job_posting = JobPosting.objects.create(
        user=user,
        jobPosition="Software Engineer",
        jobID="SE123",
        companyName="TechCorp",
        jobDescription="Develop software solutions.",
        salary="100000",
        type="Full-Time",
        mode="Remote",
        startDate=date.today(),
        usWorkAuthorization=True,
        usCitizenship=False,
        usResidency=True,
        applicationLink="https://techcorp.com/apply"
    )

    response = client.delete(reverse('job-delete', args=[job_posting.id]))
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert not JobPosting.objects.filter(id=job_posting.id).exists()
