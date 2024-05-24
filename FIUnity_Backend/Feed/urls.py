from django.urls import path
from . import views
from .views import get_image

urlpatterns = [
    path('posts/', views.PostView.as_view()),
    path('comments/', views.PostCommentView.as_view()),
    path('feed/', views.FeedView.as_view()),
    path('image/<int:image_id>/', get_image, name='get_image'),
]