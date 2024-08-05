import pytest
from django.urls import reverse
from django.contrib.auth import get_user_model

@pytest.mark.django_db
def test_user_registration(client):
    url = reverse('register')
    user_data = {
        'email': 'testuser@example.com',
        'first_name': 'Test',
        'last_name': 'User',
        'PID': '1234567',
        'password': 'password123',
        'graduation_year': 2024,
        'grad_term': 'Spring'
    }
    response = client.post(url, user_data)
    assert response.status_code == 201
    assert response.data['data']['email'] == 'testuser@example.com'

@pytest.mark.django_db
def test_user_login(client):
    User = get_user_model()
    user = User.objects.create_user(
        email='testuser@example.com',
        PID='1234567',
        first_name='Test',
        last_name='User',
        password='password123',
        graduation_year=2024,
        grad_term='Spring'
    )
    url = reverse('login')
    login_data = {
        'email': 'testuser@example.com',
        'password': 'password123'
    }
    response = client.post(url, login_data)
    assert response.status_code == 200
    assert 'access_token' in response.data
    assert 'refresh_token' in response.data

@pytest.mark.django_db
def test_user_logout(client):
    User = get_user_model()
    user = User.objects.create_user(
        email='testuser@example.com',
        PID='1234567',
        first_name='Test',
        last_name='User',
        password='password123',
        graduation_year=2024,
        grad_term='Spring'
    )
    # Login to get the tokens
    login_url = reverse('login')
    login_data = {
        'email': 'testuser@example.com',
        'password': 'password123'
    }
    login_response = client.post(login_url, login_data)
    access_token = login_response.data['access_token']
    refresh_token = login_response.data['refresh_token']

    # Use the access token for authentication in the logout request
    logout_url = reverse('logout')
    logout_data = {
        'refresh_token': refresh_token
    }
    response = client.post(logout_url, logout_data, HTTP_AUTHORIZATION=f'Bearer {access_token}')
    assert response.status_code == 204
