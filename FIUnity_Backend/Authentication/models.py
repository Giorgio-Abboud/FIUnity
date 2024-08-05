from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken
from .managers import UserManager
from datetime import date
from django.utils.timezone import now

TERM_CHOICES = [
        ('Spring', 'Spring'),
        ('Summer', 'Summer'),
        ('Fall', 'Fall'),
    ]

class AppUser(AbstractBaseUser):
    email = models.EmailField(max_length=50, unique=True)
    PID = models.CharField(max_length=7, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    graduation_year = models.IntegerField(default=2024)
    grad_term = models.CharField(max_length=10, choices=TERM_CHOICES)
    status = models.CharField(max_length=50, default='')

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

    def set_graduation_status(self):
        term_dates = {
            'Spring': (4, 26),
            'Summer': (7, 26),
            'Fall': (12, 9)
        }
        month, day = term_dates.get(self.grad_term, (4, 26))
        graduation_date = date(self.graduation_year, month, day)
        self.status = 'Alumni' if graduation_date <= now().date() else 'Student'

    def save(self, *args, **kwargs):
        self.set_graduation_status()
        super().save(*args, **kwargs)
