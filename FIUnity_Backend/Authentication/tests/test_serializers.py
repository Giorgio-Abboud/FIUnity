import pytest
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from Authentication.serializers import UserRegistrationSerializer, UserLoginSerializer, UserLogoutSerializer
from Profile.models import Profile, MainProfile

User = get_user_model()

@pytest.mark.django_db
class TestUserSerializers:

    def test_user_registration_serializer(self):
        data = {
            'email': 'test@example.com',
            'first_name': 'John',
            'last_name': 'Doe',
            'PID': '1234567',
            'password': 'password123',
            'graduation_year': 2025,
            'grad_term': 'Fall',
            # 'status': 'active'  # Assuming status is a required field
        }
        serializer = UserRegistrationSerializer(data=data)
        assert serializer.is_valid(), serializer.errors
        user = serializer.save()

        assert User.objects.filter(email='test@example.com').exists()
        assert Profile.objects.filter(user=user).exists()
        assert MainProfile.objects.filter(profile__user=user).exists()

    def test_user_login_serializer(self):
        user = User.objects.create_user(
            email='login32@example.com',
            first_name='Login',
            last_name='User',
            PID='7659321',
            password='loginpass123',
            graduation_year=2024,
            grad_term='Spring',
        )

        data = {
            'email': 'login32@example.com',
            'password': 'loginpass123'
        }
        serializer = UserLoginSerializer(data=data)
        assert serializer.is_valid(), serializer.errors
        validated_data = serializer.validated_data

        assert 'access_token' in validated_data
        assert 'refresh_token' in validated_data
        assert validated_data['email'] == 'login32@example.com'
        assert validated_data['full_name'] == user.get_full_name

    def test_user_login_serializer_invalid_credentials(self):
        data = {
            'email': 'wrong@example.com',
            'password': 'wrongpassword'
        }
        serializer = UserLoginSerializer(data=data)
        assert not serializer.is_valid(), "Serializer should not be valid with wrong credentials"
        assert 'non_field_errors' in serializer.errors, "Serializer should have non_field_errors for invalid credentials"

        # To ensure the exception is raised when accessing validated_data
        with pytest.raises(AuthenticationFailed):
            serializer.validated_data

    def test_user_logout_serializer(self):
        user = User.objects.create_user(
            email='logout@example.com',
            first_name='Logout',
            last_name='User',
            PID='7890123',
            password='logoutpass123',
            graduation_year=2023,
            grad_term='Winter',
            # status='active'
        )
        refresh = RefreshToken.for_user(user)

        data = {
            'refresh_token': str(refresh)
        }
        serializer = UserLogoutSerializer(data=data)
        assert serializer.is_valid(), serializer.errors

        # Save method should blacklist the refresh token
        serializer.save()
        with pytest.raises(TokenError):
            RefreshToken(str(refresh)).check_blacklist()
