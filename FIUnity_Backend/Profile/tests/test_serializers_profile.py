import pytest
from Profile.models import Profile, AppUser, Organization, Experience, Skill, Project, Extracurricular, StandaloneSkill, MainProfile
from Profile.serializers import ProfileSerializer, ExperienceSerializer, SkillSerializer, ProjectSerializer, ExtracurricularSerializer, StandaloneSkillSerializer, MainPageSerializer

@pytest.mark.django_db
class TestProfileSerializer:

    def test_profile_serializer(self):
        user = AppUser.objects.create_user(
            email='testprofileserializer@example.com',
            first_name='Test',
            last_name='ProfileSerializer',
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

        serializer = ProfileSerializer(profile)
        data = serializer.data

        assert data['user'] == user.id
        assert data['full_name'] == f"{user.first_name} {user.last_name}"
        assert data['graduation_year'] == profile.graduation_year


@pytest.mark.django_db
class TestExperienceSerializer:

    def test_experience_serializer(self):
        user = AppUser.objects.create_user(
            email='testexperienceserializer@example.com',
            first_name='Test',
            last_name='ExperienceSerializer',
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

        serializer = ExperienceSerializer(experience)
        data = serializer.data

        assert data['user'] == user.id
        assert data['company'] == company.id
        assert data['job_position'] == "Software Engineer"


@pytest.mark.django_db
class TestSkillSerializer:

    def test_skill_serializer(self):
        user = AppUser.objects.create_user(
            email='testskillserializer@example.com',
            first_name='Test',
            last_name='SkillSerializer',
            PID='3456789',
            password='password123',
            graduation_year=2025,
            grad_term='Fall'
        )

        skill = Skill.objects.create(
            user=user,
            skill_name="Python"
        )

        serializer = SkillSerializer(skill)
        data = serializer.data

        assert data['user'] == user.id
        assert data['skill_name'] == "Python"


@pytest.mark.django_db
class TestProjectSerializer:

    def test_project_serializer(self):
        user = AppUser.objects.create_user(
            email='testprojectserializer@example.com',
            first_name='Test',
            last_name='ProjectSerializer',
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

        serializer = ProjectSerializer(project)
        data = serializer.data

        assert data['user'] == user.id
        assert data['project'] == project_org.id
        assert data['description'] == "A sample project"


@pytest.mark.django_db
class TestExtracurricularSerializer:

    def test_extracurricular_serializer(self):
        user = AppUser.objects.create_user(
            email='testextraserializer@example.com',
            first_name='Test',
            last_name='ExtracurricularSerializer',
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

        serializer = ExtracurricularSerializer(extracurricular)
        data = serializer.data

        assert data['user'] == user.id
        assert data['extracurricular'] == extra_org.id
        assert data['description'] == "A sample extracurricular activity"


@pytest.mark.django_db
class TestStandaloneSkillSerializer:

    def test_standalone_skill_serializer(self):
        user = AppUser.objects.create_user(
            email='teststandaloneserializer@example.com',
            first_name='Test',
            last_name='StandaloneSerializer',
            PID='6789012',
            password='password123',
            graduation_year=2025,
            grad_term='Spring'
        )

        standalone_skill = StandaloneSkill.objects.create(
            user=user,
            skill_name="Data Analysis"
        )

        serializer = StandaloneSkillSerializer(standalone_skill)
        data = serializer.data

        assert data['user'] == user.id
        assert data['skill_name'] == "Data Analysis"

@pytest.mark.django_db
class TestMainProfileSerializer:

    def test_main_profile_serializer(self):
        user = AppUser.objects.create_user(
            email='testmainprofileserializer@example.com',
            first_name='Test',
            last_name='MainProfileSerializer',
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

        serializer = MainPageSerializer(main_profile)
        data = serializer.data

        assert data['profile']['id'] == profile.id
        assert str(main_profile) == f'{profile.full_name()} --> {main_profile.id}'
