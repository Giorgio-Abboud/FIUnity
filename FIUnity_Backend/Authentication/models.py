from Profile.models import Profile
from datetime import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken
from .managers import UserManager

class AppUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True)
    PID = models.CharField(max_length=7, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    graduation_year = models.IntegerField(default=2024)
    grad_term = models.CharField(max_length=10, choices=Profile.TERM_CHOICES)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['PID', 'first_name', 'last_name', 'graduation_year', 'grad_term']

    objects = UserManager()

    def tokens(self):    
        refresh = RefreshToken.for_user(self)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }

    def __str__(self):
        return self.email

    @property
    def get_full_name(self):
        return f"{self.first_name.title()} {self.last_name.title()}"

    @property
    def is_alumni(self):
        current_year = timezone.now().year
        profile = self.profile  # assuming there is a related_name="profile" in the Profile model
        return profile.graduation_year < current_year if profile else False
