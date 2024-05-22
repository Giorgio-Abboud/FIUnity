from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.core.validators import validate_email as django_validate_email

UserModel = get_user_model()

def custom_validation(data):
    email = data.get('email', '').strip()
    PID = data.get('PID', '').strip()
    password = data.get('password', '').strip()

    if not email:
        raise ValidationError('An email is required.')
    try:
        django_validate_email(email)
    except ValidationError:
        raise ValidationError('Enter a valid email address.')
    if UserModel.objects.filter(email=email).exists():
        raise ValidationError('This email is already in use.')

    if not password or len(password) < 8:
        raise ValidationError('The password must be at least 8 characters long.')

    if not PID or not PID.isdigit() or len(PID) != 7:  # Assuming Panther ID is a 7-digit number
        raise ValidationError('Invalid Panther ID. It should be a 7-digit number.')

    return data

def validate_email(email):
    email = email.strip()
    if not email:
        raise ValidationError('An email is required.')
    try:
        django_validate_email(email)
    except ValidationError:
        raise ValidationError('Enter a valid email address.')
    return True

def validate_PID(PID):
    PID = PID.strip()
    if not PID or not PID.isdigit() or len(PID) != 7:  # Assuming Panther ID is a 7-digit number
        raise ValidationError('Invalid Panther ID. It should be a 7-digit number.')
    return True

def validate_password(password):
    password = password.strip()
    if not password or len(password) < 8:
        raise ValidationError('The password must be at least 8 characters long.')
    return True
