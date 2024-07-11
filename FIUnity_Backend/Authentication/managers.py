from django.contrib.auth.models import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

class UserManager(BaseUserManager):

    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValidationError('Please enter a valid email address.')

    def PID_validator(self, PID):
        if not PID or not PID.isdigit() or len(PID) != 7:
            raise ValidationErro('Invalid Panther ID. It should be a 7-digit number.')

    def create_user(self, email, first_name, last_name, PID, password, **extra_fields):
        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError('An email address is required.')

        if not first_name:
            raise ValueError('First name is required.')

        if not last_name:
            raise ValueError('Last name is required.')

        if not password:
            raise ValueError('Password is required.')

        if PID:
            self.PID_validator(PID)
            # Additional check for uniqueness if needed
            # if self.model.objects.filter(PID=PID).exists():
            #     raise ValidationError(_('Panther ID must be unique.'))
        else:
            raise ValueError('Panther ID is required.')

        user = self.model(email=email, first_name=first_name, last_name=last_name, PID=PID, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, first_name, last_name, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_verified', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('is_staff must be True for admin user.')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('is_superuser must be True for admin user.')

        email = self.normalize_email(email)
        user = self.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            PID="",
            password=password,
            **extra_fields
        )
        user.save(using=self._db)
        return user
