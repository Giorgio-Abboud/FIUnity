from datetime import date
from django.db import models
from Internal_Plat.settings import AUTH_USER_MODEL

class Profile(models.Model):
    user = models.OneToOneField(AUTH_USER_MODEL, related_name="profile", on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, default="")
    last_name = models.CharField(max_length=50)

    SPRING = 'SP'
    SUMMER = 'SU'
    FALL = 'FA'

    TERM_CHOICES = [
        (SPRING, 'Spring'),
        (SUMMER, 'Summer'),
        (FALL, 'Fall'),
    ]

    grad_term = models.CharField(max_length=2, choices=TERM_CHOICES, default=SPRING)
    graduation_year = models.IntegerField(null=True, blank=True)

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

    class_standing = models.CharField(max_length=2, choices=CLASS_STANDING_CHOICES, default=FRESHMAN)
    major = models.CharField(max_length=50)
    career_interest = models.CharField(max_length=50)
    picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    about = models.TextField(max_length=200)

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{self.user.username} - {self.full_name()}"
    
    def update_graduation_year(self):
        if self.user.grad_date:
            self.graduation_year = self.user.grad_date.year
            self.save()

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

    user = models.ForeignKey(AUTH_USER_MODEL, related_name="experiences", on_delete=models.CASCADE)
    job_position = models.CharField(max_length=50)
    job_type = models.CharField(max_length=14, choices=JOB_TYPE_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    current = models.BooleanField(default=False)  
    company = models.CharField(max_length=50)
    description = models.TextField(max_length=200, verbose_name="Experience Description")
    alumni = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.job_position} at {self.company}"

class Project(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, related_name="projects", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=200, verbose_name="Project Description")

    def __str__(self):
        return self.name

class Extracurricular(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, related_name="extracurriculars", on_delete=models.CASCADE)
    name = models.CharField(max_length=50, verbose_name="Experience Name")
    description = models.TextField(max_length=200, verbose_name="Description")

    def __str__(self):
        return self.name

class Skill(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, related_name="skills", on_delete=models.CASCADE)
    name = models.CharField(max_length=50, verbose_name="Skill Name")
    proficiency = models.TextField(max_length=200, verbose_name="Proficiency")

    def __str__(self):
        return self.name
