from django.db import models
from Authentication.models import AppUser

class Profile(models.Model):
    user = models.OneToOneField(AppUser, related_name="profile", on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    grad_term = models.IntegerField()
    graduation_year = models.IntegerField()

    FRESHMAN = 'FR'
    SOPHOMORE = 'SO'
    JUNIOR = 'JR'
    SENIOR = 'SR'

    CLASS_STANDING_CHOICES = [
        (FRESHMAN, 'Freshman'),
        (SOPHOMORE, 'Sophomore'),
        (JUNIOR, 'Junior'),
        (SENIOR, 'Senior'),
    ]

    class_standing = models.CharField(max_length=2, choices=CLASS_STANDING_CHOICES)
    major = models.CharField(max_length=50)
    career_interest = models.CharField(max_length=50)
    picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    about = models.TextField(max_length=200)

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{self.user.username} - {self.full_name()}"

class Experience(models.Model):

    JOB_TYPE_CHOICES = [
        ('FULL-TIME', 'Full-time'),
        ('PART-TIME', 'Part-time'),
        ('SELF-EMPLOYED', 'Self-employed'),
        ('FREELANCE', 'Freelance'),
        ('CONTRACT', 'Contract'),
        ('INTERNSHIP', 'Internship'),
        ('APPRENTICESHIP', 'Apprenticeship'),
        ('SEASONAL', 'Seasonal')
    ]

    user = models.ForeignKey(AppUser, related_name="experiences", on_delete=models.CASCADE)
    job_position = models.CharField(max_length=50)
    job_type = models.CharField(max_length=14, choices=JOB_TYPE_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    current = models.BooleanField(default=False)  
    company = models.CharField(max_length=50)
    description = models.TextField(max_length=200, verbose_name="Experience Description")

    def __str__(self):
        return f"{self.job_position} at {self.company}"

class Project(models.Model):
    user = models.ForeignKey(AppUser, related_name="projects", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=200, verbose_name="Project Description")

    def __str__(self):
        return self.name

class Extracurricular(models.Model):
    user = models.ForeignKey(AppUser, related_name="extracurriculars", on_delete=models.CASCADE)
    name = models.CharField(max_length=50, verbose_name="Experience Name")
    description = models.TextField(max_length=200, verbose_name="Description")

    def __str__(self):
        return self.name

class Skill(models.Model):
    user = models.ForeignKey(AppUser, related_name="skills", on_delete=models.CASCADE)
    name = models.CharField(max_length=50, verbose_name="Skill Name")
    proficiency = models.TextField(max_length=200, verbose_name="Proficiency")

    def __str__(self):
        return self.name
