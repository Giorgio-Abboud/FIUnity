from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostView.as_view()),
    path('comments/', views.PostCommentView.as_view()),
    path('feed/', views.FeedView.as_view()),
]