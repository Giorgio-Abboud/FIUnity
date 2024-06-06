from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserLogoutSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication


# User registration view that recieves a request from the frontend
class UserRegister(GenericAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user_data = serializer.data
            return Response({
                'data': user_data,
                'message': 'Thank you for signing up!'
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# User login view that recieves a request from the frontend
class UserLogin(GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# User logout view that recieves a request from the frontend
class UserLogout(GenericAPIView):
    serializer_class = UserLogoutSerializer
    authentication_classes = [TokenAuthentication, JWTAuthentication]  # Only need JWTAuthentication
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # print("User:", request.user)  # Debugging to check if user is authenticated
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# Authentication test view for debugging purposes
class TestingAuthenticationReq(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            'msg': 'All good here pilot.'
        }
        return Response(data, status=status.HTTP_200_OK)


# =================================================================================================================== #

# Login curl command
# curl -X POST http://localhost:8000/authentication/login/ -H "Content-Type: application/json" -d '{
#     "email": "jone@example.com",
#     "password": "password123"
# }'

# Register curl command
# curl -X POST http://localhost:8000/authentication/register/ -H "Content-Type: application/json" -d '{
#     "first_name": "John",
#     "last_name": "Doe",
#     "email": "jone@example.com",
#     "PID": "0901091",
#     "password": "password123"
# }'

# Logout curl command
# curl -v -X POST \
#   http://127.0.0.1:8000/authentication/logout/ \
#   -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3NTI5NzQzLCJpYXQiOjE3MTc1MjkxNDMsImp0aSI6IjcyN2I1MWZhZGM5OTQ1YTBiOTcyNGY1Y2M3MTIwMzVlIiwidXNlcl9pZCI6MTV9.Bh-pma9BQ2NVkC9QQtm91dc4nA8SBFPSy39TK8tKcuY' \
#   -H 'Content-Type: application/json' \
#   -d '{"refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNzYxNTU0MywiaWF0IjoxNzE3NTI5MTQzLCJqdGkiOiIzODcyYjNkMGJjNjQ0MzI2YjE3Y2Q5ODY1ODE4MDcwMCIsInVzZXJfaWQiOjE1fQ.-Swb8M36B5xPWYNyB5utb9UQD7XoyGPXrfHJtkhexMM"}'
