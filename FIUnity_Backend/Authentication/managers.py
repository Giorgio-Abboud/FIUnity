from django.contrib.auth import get_user_model
from django.contrib.auth.models import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

# Helps the model create a new user
class UserManager(BaseUserManager):

    # Makes sure that the email is a valid email
    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise("please enter a valid email address")
        
    # Ensures that the PID is given and that is it unique
    def PID_validator(self, PID):
        if not PID or not PID.isdigit() or len(PID) != 7:
            raise ValidationError('Invalid Panther ID. It should be a 7-digit number.')
        
    # Creates a new user and returns it once the given fields are validated
    def create_user(self, email, first_name, last_name, PID, password, **extra_fields):
        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError("An email address is required")
        
        if not first_name:
            raise ValueError("First name is required")
        
        if not last_name:
            raise ValueError("Last name is required")
        
        if not password:
            raise ValueError("Password is required")
        
        if PID:
            self.PID_validator(PID)
        else:
            raise ValueError("Panther ID is required")
        
        user = self.model(email=email, first_name=first_name, last_name=last_name, PID=PID, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    # Creates the superuser
    def create_superuser(self, email, first_name, last_name, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_verified", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("is staff must be true for admin user")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("is superuser must be true for admin user")

        user = self.create_user(
            email, first_name, last_name, password, **extra_fields
        )
        user.save(using=self._db)
        return user