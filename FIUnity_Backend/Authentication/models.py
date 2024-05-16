from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('Email required.')
		if not password:
			raise ValueError('Password required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email, password=None):
		if not email:
			raise ValueError('Email required.')
		if not password:
			raise ValueError('Password required.')
		user = self.create_user(email, password)
		user.is_superuser = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	PID = models.CharField(max_length=7, unique=True)
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['PID']
	objects = AppUserManager()
	def __str__(self):
		return self.PID

# The only authentication in panther email and panther ID
# Also check for graduation date to know if student or alumni

class JobPosting(models.Model):
    job_position = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    job_description = models.TextField()
    salary = models.CharField(max_length=50)

    TYPE_CHOICES = [
        ('Internship'),
        ('Part-Time'),
        ('Full-Time'),
    ]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES)

    MODE_CHOICES = [
        ('In-Person'),
        ('Hybrid'),
        ('Remote')
    ]

    mode = models.CharField(max_length=20, choices=MODE_CHOICES)
    start_date = models.DateField()
	end_date = models.DateField()
	other_requirements = models.TextField()
    us_work_authorization = models.BooleanField()
    us_citizenship = models.BooleanField()
    us_residency = models.BooleanField()
    application_link = models.URLField()

    def __str__(self):
        return self.job_position
