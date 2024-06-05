from .models import AppUser
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

# Creating a new user
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=8, write_only=True)

    class Meta:
        model = AppUser
        fields = ['email', 'first_name', 'last_name', 'PID', 'password']

    def create(self, validated_data):
        user = AppUser.objects.create_user(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            PID = validated_data['PID'],
            password = validated_data['password']
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


        

# from rest_framework import serializers
# from django.contrib.auth import get_user_model, authenticate
# from .utils import CustomValidation, normalize_email
# from rest_framework import serializers, status

# UserModel = get_user_model()

# class UserRegistrationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserModel
#         fields = ('PID', 'first_name', 'last_name', 'email', 'password')
    
#     def create(self, clean_data):
#         user_obj = UserModel.objects.create_user(
#             email=clean_data['email'],
#             password=clean_data['password'],
#             first_name=clean_data['first_name'],
#             last_name=clean_data['last_name'],
#             PID=clean_data['PID']
#         )
#         user_obj.PID = clean_data['PID']
#         user_obj.save()
#         return user_obj

# class UserLoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField()

#     def validate(self, attrs):
#         email = attrs.get('email')
#         password = attrs.get('password')
#         email = normalize_email(email)

#         try:
#             user = UserModel.objects.get(email__iexact=email)
#         except UserModel.DoesNotExist:
#             raise CustomValidation(
#                 detail='User is not registered with this Email Address',
#                 field='email',
#                 status_code=status.HTTP_404_NOT_FOUND
#             )

#         # Authenticate user
#         user = authenticate(email=email, password=password)
#         if not user:
#             raise CustomValidation(
#                 detail='Unable to authenticate with provided credentials',
#                 field='multiple',
#                 status_code=status.HTTP_401_UNAUTHORIZED
#             )

#         return {
#             'email': user.email,
#             'password': password,
#         }
    
# class UserSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField(read_only=True)
#     first_name = serializers.CharField()
#     last_name = serializers.CharField()
#     email = serializers.CharField()
#     PID = serializers.CharField()
#     password = serializers.CharField(write_only=True)
