from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):

    def create_user(self, first_name : str, last_name: str, email: str, PID: str, password: str = None, is_staff=False, is_superuser=False) -> "AppUser":
        
        if not email:
            raise ValueError('Users must have an email address')
        
        if not password:
            raise ValueError('Users must have a Password')
        
        if not first_name:
            raise ValueError('Users must have a first name')

        if not last_name:
            raise ValueError('Users must have a last name')

        user = self.model(email=self.normalize_email(email))
        user.first_name = first_name
        user.last_name = last_name
        user.PID = PID
        user.set_password(password)
        user.is_active = True
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        user.save()

        return user

    def create_superuser(self, first_name : str, last_name: str, email: str, PID: str, password: str) -> "AppUser":

        user = self.create_user(
            first_name=first_name,
            last_name=last_name,
            PID = PID,
            email=email,
            password=password,
            is_staff=True,
            is_superuser=True
        )
        user.save()
        return user
    

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
    
    def get_user_id(self):
        return self.pk

    class Meta:
        verbose_name = 'App User'
        verbose_name_plural = 'App Users'