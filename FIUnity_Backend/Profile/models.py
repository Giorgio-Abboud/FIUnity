from django.db import models
from django.db.models.signals import post_save
from Authentication.models import AppUser
from django.db.models import F, Q
import string, random
from django.dispatch import receiver

# Creating the options for the terms and employment types
TERM_CHOICES = [
        ('Spring', 'Spring'),
        ('Summer', 'Summer'),
        ('Fall', 'Fall'),
    ]

JOB_TYPE_CHOICES = [
        ('Full-time', 'Full-time'),
        ('Part-time', 'Part-time'),
        ('Self-employed', 'Self-employed'),
        ('Freelance', 'Freelance'),
        ('Contract', 'Contract'),
        ('Internship', 'Internship'),
        ('Apprenticeship', 'Apprenticeship'),
        ('Seasonal', 'Seasonal'),
        ('Unemployed', 'Unemployed')
    ]

# Creating the options to choose how information is being stored
ORGANIZATION_CHOICES = [
        ('Company', 'Company'),
        ('Project', 'Project'),
        ('Extra', 'Extra'),
        ('None', 'None')
    ]

# Creating the function that will organize the information of other models
class Organization(models.Model):
    
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, blank = True, null = True)
    type = models.CharField(max_length=50, choices=ORGANIZATION_CHOICES, default='None')
    registered = models.BooleanField(default=False)
        
    def __str__(self):
        return f"{self.name} --> {self.type}"

# Creates a random and easily identifiable name for the created experience, project, and extracurricular
@receiver(post_save, sender=Organization)
def set_default_username(sender, instance, created, **kwargs):
    if created: 
        rand = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        instance.username = instance.name.lower().replace(" ", "-") + "-" + rand
        instance.save()

# Creating the base profile with the user's information
class Profile(models.Model):
    user = models.OneToOneField(AppUser, related_name="profile", on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, default="")
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True, null=True)
    grad_term = models.CharField(max_length=10, choices=TERM_CHOICES, default='Spring')
    graduation_year = models.IntegerField(null=True)
    major = models.CharField(max_length=50, default='')
    career_interest = models.CharField(max_length=50, default='')
    picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.pk:  # If the profile is being created
            self.first_name = self.user.first_name
            self.last_name = self.user.last_name
            self.email = self.user.email
            self.grad_term = self.user.grad_term
            self.graduation_year = self.user.graduation_year
        super(Profile, self).save(*args, **kwargs)

    def full_name(self):
        return f"{self.user.first_name} {self.user.last_name}"

# Creating the section containing the user's past experiences like jobs
class Experience(models.Model):
    user = models.ForeignKey(AppUser, related_name="experiences", on_delete=models.CASCADE)
    job_position = models.CharField(max_length=50)
    company = models.ForeignKey(Organization,on_delete=models.SET_NULL, blank = True, null = True,
                                related_name = "company")
    location = models.CharField(max_length=50, blank = True, null = True)
    currently_working = models.BooleanField(default = False)
    job_type = models.CharField(max_length=14, choices=JOB_TYPE_CHOICES)
    start_date = models.DateField(blank = True, null = True)
    end_date = models.DateField(blank = True, null = True, default=None)
    description = models.TextField(blank=True, null = True)
    tagline = models.CharField(max_length=200, blank = True, null = True)

    class Meta:
        constraints = [
            models.CheckConstraint(check = Q(end_date__gte= F('start_date')), 
                                   name = "correct end date",
                                   violation_error_message= "End date should be greater than starting date"),
        ]

    def save(self, *args, **kwargs):
        self.tagline = f"{self.job_position} at {self.company} "
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.user.full_name()} --> {self.company} - ({self.job_position})"

# Creating the section containing the user's tech skills
class Skill(models.Model):
    user = models.ForeignKey(AppUser, related_name="skills", on_delete=models.CASCADE)
    skill_name = models.CharField(max_length=100, null=True)

    def __str__(self):
        return f"{self.skill_name} --> {self.user.profile.full_name()} : {self.user.id}"

# Creating the section containing the user's projects
class Project(models.Model):
    user = models.ForeignKey(AppUser, related_name="projects", on_delete=models.CASCADE)
    project = models.ForeignKey(Organization, on_delete=models.SET_NULL, blank = True, null = True,
                                     related_name = "project")
    description = models.TextField(max_length=200, blank=True)
    skills = models.ManyToManyField(Skill, related_name="project_skill", blank = True)
    tagline = models.CharField(max_length=200, blank = True, null = True)

    def save(self, *args, **kwargs):
        self.tagline = f"Project: {self.project.name} "
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.full_name()} --> {self.user.id}"

# Creating the section containing the user's extracurricular activities
class Extracurricular(models.Model):
    user = models.ForeignKey(AppUser, related_name="extracurriculars", on_delete=models.CASCADE)
    extracurricular = models.ForeignKey(Organization, on_delete=models.SET_NULL, blank = True, null = True,
                                     related_name = "extra")
    description = models.TextField(max_length=200, blank=True)
    tagline = models.CharField(max_length=200, blank = True, null = True)

    def save(self, *args, **kwargs):
        self.tagline = f"Extracurricular: {self.extracurricular.name} "
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.full_name()} --> {self.id}"

# Model that bring together the components of the profile page together
class MainProfile(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name="Main_Profile")
    current_company =  models.OneToOneField(Experience, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    current_extracurricular =  models.OneToOneField(Extracurricular, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    current_project =  models.OneToOneField(Project, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    about = models.TextField(blank = True, null = True, default=None)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    about = models.TextField(max_length=200, default='')
    
    def __str__(self):
        return f'{self.profile.full_name()} --> {self.id}'
    