from rest_framework import serializers
from .models import JobPosting

class JobPostingSerializer(serializers.ModelSerializer):
    jobPosition = serializers.CharField() 
    jobID = serializers.CharField(max_length=100, required=False)
    companyName = serializers.CharField()
    jobDescription = serializers.CharField(required=False)
    salary = serializers.CharField()
    type = serializers.CharField()
    mode = serializers.CharField()
    startDate = serializers.DateField()
    endDate = serializers.DateField(required=False)
    otherRequirements = serializers.CharField(required=False)
    usWorkAuthorization = serializers.BooleanField()
    usCitizenship = serializers.BooleanField()
    usResidency = serializers.BooleanField()
    applicationLink = serializers.URLField()

    class Meta:
        model = JobPosting
        fields = '__all__'
