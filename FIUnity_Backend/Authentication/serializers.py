from Profile.models import *
from .models import AppUser
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


# Creating a new user
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=8, write_only=True)
    graduation_year = serializers.IntegerField(required=True)
    grad_term = serializers.ChoiceField(choices=TERM_CHOICES, required=True)

    class Meta:
        model = AppUser
        fields = ['email', 'first_name', 'last_name', 'PID', 'password', 'graduation_year', 'grad_term', 'status']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = AppUser.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            PID=validated_data['PID'],
            password=validated_data['password'],
            graduation_year=validated_data['graduation_year'],
            grad_term=validated_data['grad_term']
        )
        user.save()

        # Create the profile
        profile = Profile.objects.create(
            user=user,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            grad_term=user.grad_term,
            graduation_year=user.graduation_year,
            status=user.status
        )

        # Create the main profile
        MainProfile.objects.create(
            profile=profile
        )

        return user

# Logging in the user and refresh the token
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=50)
    password = serializers.CharField(max_length=50, write_only=True)
    PID = serializers.CharField(max_length=7, read_only=True)
    full_name = serializers.CharField(max_length=255, read_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = AppUser
        fields = ['email', 'PID', 'password', 'full_name', 'access_token', 'refresh_token']

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        PID = attrs.get('PID')
        request = self.context.get('request')

        try:
            user = authenticate(request, email=email, password=password, PID=PID)
            if not user:
                raise AuthenticationFailed("Invalid credentials")

            tokens = user.tokens()

            return {
                'email': user.email,
                'full_name': user.get_full_name,
                'access_token': str(tokens.get('access')),
                'refresh_token': str(tokens.get('refresh'))
            }
        except AuthenticationFailed:
            raise AuthenticationFailed("Invalid credentials")
    
# Logout user and expire the token
class UserLogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    default_error_messages = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs.get('refresh_token')

        return attrs
    
    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            return self.fail('bad_token')
