from django.contrib.auth import login, logout, authenticate
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import UserRegistrationSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from django.middleware.csrf import get_token, rotate_token
from django.core.exceptions import ValidationError
from rest_framework.authtoken.models import Token

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        try:
            clean_data = custom_validation(request.data)
            serializer = UserRegistrationSerializer(data=clean_data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.create(clean_data)
                if user:
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = [permissions.AllowAny,]
    
    def post(self, request):
        
        serializer = UserLoginSerializer(data=request.data)
        print("is valid start")
        serializer.is_valid(raise_exception=True)
        print("is valid done")
        
        # Get validated data
        # print(serializer.email)
        # email = serializer.validated_data.get('email')
        # password = serializer.validated_data.get('password')

        email = serializer.email
        password = serializer.password
        print("start")
        # Authenticate user
        user = authenticate(email=email, password=password)
        print("finish")
        print(user)

        if user is not None:
            print("We got here")
            # User is authenticated, login the user
            login(request, user)

            # Generate or retrieve an authentication token for the user
            token, created = Token.objects.get_or_create(user=user)

            # Return response with token
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            # Authentication failed
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = (SessionAuthentication,)

    # def post(self, request):
    #     data = request.data
    #     try:
    #         validate_email(data['email'])
    #         validate_password(data['password'])

    #         serializer = UserLoginSerializer(data=data, context={'request': request})
    #         if serializer.is_valid(raise_exception=True):
    #             print("Here")
    #             user = serializer.check_user(data)
    #             login(request, user)

    #             # Get CSRF token
    #             csrf_token = get_token(request)

    #             # Include CSRF token in response data
    #             response_data = serializer.data
    #             response_data['csrf_token'] = csrf_token

    #             return Response(response_data, status=status.HTTP_200_OK)
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #     except ValidationError as e:
    #         return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    
    def post(self, request):
        logout(request)

        # Rotate CSRF token to invalidate the old token
        rotate_token(request)

        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
