# jobs/models.py
from django.db import models

class JobPosting(models.Model):
    job_position = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    job_description = models.TextField(blank=True, null=True)
    salary = models.CharField(max_length=50)

    TYPE_CHOICES = [
        ('Internship', 'Internship'),
        ('Part-Time', 'Part-Time'),
        ('Full-Time', 'Full-Time'),
    ]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES)

    MODE_CHOICES = [
        ('In-Person', 'In-Person'),
        ('Hybrid', 'Hybrid'),
        ('Remote', 'Remote')
    ]

    mode = models.CharField(max_length=20, choices=MODE_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    other_requirements = models.TextField(blank=True, null=True)
    us_work_authorization = models.BooleanField()
    us_citizenship = models.BooleanField()
    us_residency = models.BooleanField()
    application_link = models.URLField()

    def __str__(self):
        return self.job_position
