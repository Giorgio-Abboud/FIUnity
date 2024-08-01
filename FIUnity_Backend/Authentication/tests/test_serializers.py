import pytest
from django.contrib.auth import get_user_model
from Authentication.serializers import UserRegistrationSerializer

@pytest.mark.django_db
def test_user_registration_serializer():
    user_data = {
        'email': 'testuser@example.com',
        'first_name': 'Test',
        'last_name': 'User',
        'PID': '1234567',
        'password': 'password123',
        'graduation_year': 2024,
        'grad_term': 'Spring'
    }
    serializer = UserRegistrationSerializer(data=user_data)
    assert serializer.is_valid()
    user = serializer.save()
    assert user.email == 'testuser@example.com'
    assert user.PID == '1234567'
    assert user.first_name == 'Test'
    assert user.last_name == 'User'
    assert user.graduation_year == 2024
    assert user.grad_term == 'Spring'
    assert user.check_password('password123')
