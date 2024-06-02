# Authentication/urls.py
from django.urls import path
from .views import UserRegister, UserLogin, UserLogout, UserView

urlpatterns = [
    path('register/', UserRegister.as_view(), name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),
    path('user/', UserView.as_view(), name='user'),
]
