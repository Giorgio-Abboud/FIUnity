from django.contrib.auth import login, logout, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer
from .validations import custom_validation
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware.csrf import rotate_token

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        try:
            clean_data = custom_validation(request.data)
            serializer = UserRegistrationSerializer(data=clean_data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = authenticate(email=email, password=password)

            if user is not None:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user_id': user.user_id,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            
class UserLogout(APIView):
    permission_classes = [permissions.IsAuthenticated] # To be changed later
    # permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        logout(request)
        rotate_token(request)
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)

# Curl command example for logout
# curl -v -X POST \
#   http://127.0.0.1:8000/authentication/logout/ \
#   -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MTEyNjY3LCJpYXQiOjE3MTcxMTIzNjcsImp0aSI6Ijg2M2ZhODQ0YzBhMjRjOGM5OGNjNTg1Y2NkNzg1ZDBmIiwidXNlcl9pZCI6MTF9.7crxHUGd_G0pHArCLuSyHsQwSAwPlgzaS3RPuroYW4s' \
#   -H 'Content-Type: application/json' \
#   -d '{"refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNzE5ODc2NywiaWF0IjoxNzE3MTEyMzY3LCJqdGkiOiIzMTZhYjE4ZGQ2OWI0ZDMxODhmNTBmMDk5NjY0Y2RmZCIsInVzZXJfaWQiOjExfQ.2nNS8-h7EkMWZ8-SChCAO102k7jvER18-IC29PJChJ0"}'
