import pytest
from Jobs.serializers import JobPostingSerializer
from Jobs.models import JobPosting
from Authentication.models import AppUser
from datetime import date

@pytest.mark.django_db
def test_job_posting_serializer_valid_data():
    user = AppUser.objects.create_user(
        email="testuser@example.com",
        password="password123",
        first_name="John",
        last_name="Doe",
        PID="1234567",
        graduation_year=2024,
        grad_term="Fall"
    )
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
        endDate=None,
        otherRequirements="Proficiency in Python.",
        usWorkAuthorization=True,
        usCitizenship=False,
        usResidency=True,
        applicationLink="https://techcorp.com/apply"
    )

    serializer = JobPostingSerializer(instance=job_posting)
    data = serializer.data

    assert data['jobPosition'] == "Software Engineer"
    assert data['companyName'] == "TechCorp"
    assert data['full_name'] == "John Doe"
    assert data['status'] == user.status
    assert 'jobID' in data
    assert 'usWorkAuthorization' in data
    assert 'applicationLink' in data
