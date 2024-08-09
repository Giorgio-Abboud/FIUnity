from rest_framework import serializers
from .models import JobPosting
from django.contrib.auth import get_user_model

user = get_user_model()

class JobPostingSerializer(serializers.ModelSerializer):
    jobPosition = serializers.CharField() 
    jobID = serializers.CharField(max_length=100, required=False, allow_blank=True)
    companyName = serializers.CharField()
    jobDescription = serializers.CharField(required=False, allow_blank=True)
    salary = serializers.CharField()
    type = serializers.CharField()
    mode = serializers.CharField()
    startDate = serializers.DateField()
    endDate = serializers.DateField(required=False, allow_null=True)
    otherRequirements = serializers.CharField(required=False, allow_blank=True)
    usWorkAuthorization = serializers.BooleanField()
    usCitizenship = serializers.BooleanField()
    usResidency = serializers.BooleanField()
    applicationLink = serializers.URLField()
    created_at = serializers.DateTimeField(read_only=True)

    full_name = serializers.SerializerMethodField()
    status = serializers.CharField(source='user.status', read_only=True)

    class Meta:
        model = JobPosting
        fields = '__all__'
        read_only_fields = ['user']

    def get_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    