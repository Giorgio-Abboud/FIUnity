# jobs/urls.py
from django.urls import path
from .views import JobPostingView

urlpatterns = [
    path('job-posting/', JobPostingView.as_view(), name='job-posting'),
    path('job-delete/<int:pk>/', JobPostingView.as_view(), name='job-delete'),  # For delete operation (DELETE)
]
