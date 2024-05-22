from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers, status
from .utils import CustomValidation, normalize_email

UserModel = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('PID', 'first_name', 'last_name', 'email', 'password')
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(email=clean_data['email'],
                                                 password=clean_data['password'])
        user_obj.PID = clean_data['PID']
        user_obj.save()
        return user_obj
    
class UserLoginSerializer(serializers.Serializer):

    class Meta:
        model = UserModel
        fields = '__all__'
    
    # message= serializers.CharField(read_only=True)
    email = serializers.EmailField()
    password = serializers.CharField()
    # tokens = serializers.JSONField(read_only=True)
        
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        email = normalize_email(email)
        self.email = email
        self.password = password

        print(email, password)

        try:
            user = UserModel.objects.get(email__iexact = email)
            return True
        except:
            print("In except")
            raise CustomValidation(detail ='User is not registered with this Email Address',
                                   field = 'email',
                                   status_code= status.HTTP_404_NOT_FOUND)
        # print("before get token")
        # print("User here before", user, user.get_tokens)
        # user = authenticate(
        #     email=email,
        #     password=password
        # )
        # print("User here", user, user.get_tokens)

        # if not user:
        #     raise CustomValidation(detail='Unable to authenticate with provided credentials',
        #                            field= 'multiple',
        #                            status_code= status.HTTP_401_UNAUTHORIZED)

        # return {
        #     'message': "Login Successful",
        #     'tokens': user.get_tokens,
        # }
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'PID')