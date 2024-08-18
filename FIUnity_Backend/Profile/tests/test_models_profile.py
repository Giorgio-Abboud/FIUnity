import pytest
from django.utils.timezone import now
from Profile.models import Profile, AppUser, TERM_CHOICES, Experience, Organization, Skill, Project, Extracurricular, StandaloneSkill, MainProfile
from django.core.exceptions import ValidationError
from django.db import IntegrityError

@pytest.mark.django_db
class TestProfileModel:

    def test_profile_creation(self):
        user = AppUser.objects.create_user(
            email='testprofile@example.com',
            first_name='Test',
            last_name='Profile',
            PID='7654321',
            password='password123',
            graduation_year=2025,
            grad_term='Spring'
        )

        profile = Profile.objects.create(
            user=user,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            grad_term=user.grad_term,
            graduation_year=user.graduation_year,
            status='Student'
        )

        assert profile.user == user
        assert profile.full_name() == f"{user.first_name} {user.last_name}"

    def test_check_graduation_status(self):
        user = AppUser.objects.create_user(
            email='testgradstatus@example.com',
            first_name='Grad',
            last_name='Status',
            PID='9876543',
            password='password123',
            graduation_year=2023,
            grad_term='Fall'
        )

        profile = Profile.objects.create(
            user=user,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            grad_term=user.grad_term,
            graduation_year=user.graduation_year,
            status='Student'
        )

        profile.check_graduation_status()
        if profile.get_graduation_date() <= now().date():
            assert profile.status == 'Alumni'
        else:
            assert profile.status == 'Student'


@pytest.mark.django_db
class TestExperienceModel:

    def test_experience_creation(self):
        user = AppUser.objects.create_user(
            email='testexperience@example.com',
            first_name='Test',
            last_name='Experience',
            PID='2345678',
            password='password123',
            graduation_year=2024,
            grad_term='Spring'
        )

        company = Organization.objects.create(name="Test Company", type="Company")

        experience = Experience.objects.create(
            user=user,
            job_position="Software Engineer",
            company=company,
            location="New York",
            currently_working=True,
            job_type="Full-time",
            start_date="2022-01-01",
            end_date="2023-01-01"
        )

        assert experience.user == user
        assert experience.tagline == f"{experience.job_position} at {company}"

    def test_experience_end_date_validation(self):
        user = AppUser.objects.create_user(
            email='testexperience@example.com',
            first_name='Test',
            last_name='Experience',
            PID='2345678',
            password='password123',
            graduation_year=2024,
            grad_term='Spring'
        )

        company = Organization.objects.create(name="Test Company", type="Company")

        with pytest.raises(IntegrityError):
            experience = Experience.objects.create(
                user=user,
                job_position="Software Engineer",
                company=company,
                location="New York",
                currently_working=True,
                job_type="Full-time",
                start_date="2023-01-01",
                end_date="2022-01-01"
            )
            experience.clean_fields()  # This will trigger validation


@pytest.mark.django_db
class TestSkillModel:

    def test_skill_creation(self):
        user = AppUser.objects.create_user(
            email='testskill@example.com',
            first_name='Test',
            last_name='Skill',
            PID='3456789',
            password='password123',
            graduation_year=2025,
            grad_term='Fall'
        )

        skill = Skill.objects.create(
            user=user,
            skill_name="Python"
        )

        assert skill.user == user
        assert skill.skill_name == "Python"


@pytest.mark.django_db
class TestProjectModel:

    def test_project_creation(self):
        user = AppUser.objects.create_user(
            email='testproject@example.com',
            first_name='Test',
            last_name='Project',
            PID='4567890',
            password='password123',
            graduation_year=2023,
            grad_term='Spring'
        )

        project_org = Organization.objects.create(name="Test Project", type="Project")

        project = Project.objects.create(
            user=user,
            project=project_org,
            description="A sample project"
        )

        assert project.user == user
        assert project.tagline == f"Project: {project_org.name}"


@pytest.mark.django_db
class TestExtracurricularModel:

    def test_extracurricular_creation(self):
        user = AppUser.objects.create_user(
            email='testextra@example.com',
            first_name='Test',
            last_name='Extracurricular',
            PID='5678901',
            password='password123',
            graduation_year=2024,
            grad_term='Fall'
        )

        extra_org = Organization.objects.create(name="Test Extracurricular", type="Extra")

        extracurricular = Extracurricular.objects.create(
            user=user,
            extracurricular=extra_org,
            description="A sample extracurricular activity"
        )

        assert extracurricular.user == user
        assert extracurricular.tagline == f"Extracurricular: {extra_org.name}"


@pytest.mark.django_db
class TestStandaloneSkillModel:

    def test_standalone_skill_creation(self):
        user = AppUser.objects.create_user(
            email='teststandalone@example.com',
            first_name='Test',
            last_name='Standalone',
            PID='6789012',
            password='password123',
            graduation_year=2025,
            grad_term='Spring'
        )

        standalone_skill = StandaloneSkill.objects.create(
            user=user,
            skill_name="Data Analysis"
        )

        assert standalone_skill.user == user
        assert standalone_skill.skill_name == "Data Analysis"
        assert standalone_skill.is_standalone


@pytest.mark.django_db
class TestMainProfileModel:

    def test_main_profile_creation(self):
        user = AppUser.objects.create_user(
            email='testmainprofile@example.com',
            first_name='Test',
            last_name='MainProfile',
            PID='7890123',
            password='password123',
            graduation_year=2023,
            grad_term='Summer'
        )

        profile = Profile.objects.create(
            user=user,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            grad_term=user.grad_term,
            graduation_year=user.graduation_year,
            status='Student'
        )

        main_profile = MainProfile.objects.create(
            profile=profile
        )

        assert main_profile.profile == profile
        assert str(main_profile) == f'{profile.full_name()} --> {main_profile.id}'
