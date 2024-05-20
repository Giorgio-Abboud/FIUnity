# jobs/urls.py
from django.urls import path
from .views import JobPostingView

urlpatterns = [
    path('job-posting/', JobPostingView.as_view(), name='job-posting'),
    path('job-list/', JobPostingView.as_view(), name='job-list')
]
