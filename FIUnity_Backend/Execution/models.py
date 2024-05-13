from django.db import models

# Create user models
class User(models.Model):
    email = models.CharField(max_length=80)
    PID = models.CharField(max_length=7)

# class Student(models.Model):
#     username = models.CharField(max_length=30)
#     password = models.CharField(max_length=30)
#     first_name = models.CharField(max_length=30)
#     last_name = models.CharField(max_length=30)
#     email = models.CharField(max_length=80, unique=True)
#     career_interest = models.CharField(max_length=50)
#     pather_ID = models.IntegerField(null=False, unique=True)
#     grad_year = models.IntegerField(null=False)
#     class_standing = models.CharField(max_length=30)
#     linkedin = models.CharField(max_length=30, unique=True)

# class Alumni(models.Model):
#     username = models.CharField(max_length=30)
#     password = models.CharField(max_length=30)
#     first_name = models.CharField(max_length=30)
#     last_name = models.CharField(max_length=30)
#     email = models.CharField(max_length=80, unique=True)
#     career = models.CharField(max_length=50)
#     pather_ID = models.IntegerField(null=False, unique=True)
#     grad_year = models.IntegerField(null=False)
#     job_position = models.CharField(max_length=30)
#     company = models.CharField(max_length=30)
#     city = models.CharField(max_length=30)
#     state = models.CharField(max_length=30)
#     country = models.CharField(max_length=30)
#     years_experience = models.IntegerField(null=False)
#     linkedin = models.CharField(max_length=80, unique=True)

# The only authentication in pather email and pather ID
# Also check for graduation date to know if student or alumni

