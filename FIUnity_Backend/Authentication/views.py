from django.contrib.auth import login, logout, authenticate
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import UserRegistrationSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation
from django.middleware.csrf import rotate_token
from django.core.exceptions import ValidationError
from rest_framework.authtoken.models import Token

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        try:
            print("Even before")
            clean_data = custom_validation(request.data)
            print("Before")
            serializer = UserRegistrationSerializer(data=clean_data)
            print("Here")
            if serializer.is_valid(raise_exception=True):
                user = serializer.create(clean_data)
                if user:
                    print("User created")
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            print("Bad request 1")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            print("Bad request 2")
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        
        serializer = UserLoginSerializer(data=request.data)
        print("is valid start")
        serializer.is_valid(raise_exception=True)
        print("is valid done")

        email = serializer.email
        password = serializer.password
        # first_name = serializer.first_name
        # last_name = serializer.last_name

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

            print("We got futher")
            # Return response with token
            return Response({'token': token.key, 'user_id': user.user_id, 'first_name': user.first_name, 'last_name': user.last_name}, status=status.HTTP_200_OK)
        else:
            # Authentication failed
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserLogout(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # Get the authentication token associated with the user
        try:
            token = Token.objects.get(user=request.user)
            # Delete the token
            token.delete()
        except Token.DoesNotExist:
            pass  # Token does not exist, no need to delete

        # Logout the user
        logout(request)

        # Rotate CSRF token to invalidate the old token
        rotate_token(request)

        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
