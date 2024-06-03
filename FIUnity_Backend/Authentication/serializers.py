from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .utils import CustomValidation, normalize_email
from rest_framework import serializers, status

UserModel = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('PID', 'first_name', 'last_name', 'email', 'password')
    
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(
            email=clean_data['email'],
            password=clean_data['password'],
            first_name=clean_data['first_name'],
            last_name=clean_data['last_name'],
            PID=clean_data['PID']
        )
        user_obj.PID = clean_data['PID']
        user_obj.save()
        return user_obj

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        email = normalize_email(email)

        try:
            user = UserModel.objects.get(email__iexact=email)
        except UserModel.DoesNotExist:
            raise CustomValidation(
                detail='User is not registered with this Email Address',
                field='email',
                status_code=status.HTTP_404_NOT_FOUND
            )

        # Authenticate user
        user = authenticate(email=email, password=password)
        if not user:
            raise CustomValidation(
                detail='Unable to authenticate with provided credentials',
                field='multiple',
                status_code=status.HTTP_401_UNAUTHORIZED
            )

        return {
            'email': user.email,
            'password': password,
        }
    
class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    PID = serializers.CharField()
    password = serializers.CharField(write_only=True)
