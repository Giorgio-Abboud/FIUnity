from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field is required.')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    PID = models.CharField(max_length=7, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['PID', 'first_name', 'last_name']

    objects = AppUserManager()

    def __str__(self):
        return self.PID

    class Meta:
        verbose_name = 'App User'
        verbose_name_plural = 'App Users'


# The only authentication in panther email and panther ID
# Also check for graduation date to know if student or alumni

# class JobPosting(models.Model):
#     job_position = models.CharField(max_length=100)
#     company_name = models.CharField(max_length=100)
#     job_description = models.TextField()
#     salary = models.CharField(max_length=50)

#     TYPE_CHOICES = [
#         ('Internship'),
#         ('Part-Time'),
#         ('Full-Time'),
#     ]

#     type = models.CharField(max_length=20, choices=TYPE_CHOICES)

#     MODE_CHOICES = [
#         ('In-Person'),
#         ('Hybrid'),
#         ('Remote')
#     ]

#     mode = models.CharField(max_length=20, choices=MODE_CHOICES)
#     start_date = models.DateField()
# 	end_date = models.DateField()
# 	other_requirements = models.TextField()
# 	us_work_authorization = models.BooleanField()
#     us_citizenship = models.BooleanField()
#     us_residency = models.BooleanField()
#     application_link = models.URLField()

#     def __str__(self):
#         return self.job_position
