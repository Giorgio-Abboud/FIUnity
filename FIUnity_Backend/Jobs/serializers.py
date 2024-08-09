from rest_framework import serializers
from .models import JobPosting
from django.contrib.auth import get_user_model

user = get_user_model()

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

    full_name = serializers.SerializerMethodField()
    status = serializers.CharField(source='user.status', read_only=True)

    class Meta:
        model = JobPosting
        fields = '__all__'
        read_only_fields = ['user']

    def get_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    