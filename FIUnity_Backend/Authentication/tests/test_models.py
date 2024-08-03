from Authentication.models import AppUser
import pytest

@pytest.mark.django_db
def test_appuser_creation():
    User = AppUser
    user = User.objects.create_user(
        email='testuser@example.com',
        PID='1234567',
        first_name='Test',
        last_name='User',
        password='password123',
        graduation_year=2026,
        grad_term='Spring',
    )
    assert user.email == 'testuser@example.com'
    assert user.PID == '1234567'
    assert user.first_name == 'Test'
    assert user.last_name == 'User'
    assert user.graduation_year == 2026
    assert user.grad_term == 'Spring'
    assert user.is_active
    assert not user.is_staff
    assert not user.is_superuser
    assert user.check_password('password123')
    assert user.status == 'Student'

@pytest.mark.django_db
def test_appuser_str():
    User = AppUser
    user = User.objects.create_user(
        email='testuser@example.com',
        PID='1234567',
        first_name='Test',
        last_name='User',
        password='password123',
        graduation_year=2024,
        grad_term='Spring'
    )
    assert str(user) == 'testuser@example.com'

# export DJANGO_SETTINGS_MODULE=Internal_Plat.settings