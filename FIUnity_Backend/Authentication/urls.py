from django.urls import path
from .views import UserRegister, UserLogin, UserLogout, TestingAuthenticationReq
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', UserRegister.as_view(), name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),

    path('get-something/', TestingAuthenticationReq.as_view(), name='just-for-testing'),
    
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
