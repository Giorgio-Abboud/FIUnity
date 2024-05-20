# jobs/models.py
from django.db import models

class JobPosting(models.Model):
    jobPosition = models.CharField(max_length=100, default='')
    jobID = models.CharField(max_length=100)
    companyName = models.CharField(max_length=100)
    jobDescription = models.TextField(blank=True, null=True)
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
    startDate = models.DateField()
    endDate = models.DateField(blank=True, null=True)
    otherRequirements = models.TextField(blank=True, null=True)
    usWorkAuthorization = models.BooleanField()
    usCitizenship = models.BooleanField()
    usResidency = models.BooleanField()
    applicationLink = models.URLField()

    def __str__(self):
        return self.job_position
