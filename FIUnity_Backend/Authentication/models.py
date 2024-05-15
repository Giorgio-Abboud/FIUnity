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

# The only authentication in pather email and pather ID
# Also check for graduation date to know if student or alumni
