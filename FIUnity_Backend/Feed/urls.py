from django.urls import path
from . import views
from .views import get_image

urlpatterns = [
    path('posts/', views.PostView.as_view()),
    path('posts/<int:post_id>/like/', views.like, name='post-like'),    
    path('comments/', views.PostCommentView.as_view()),
    # path('comments/<int:comment_id>/like/', views.PostCommentView.as_view()),
    path('feed/', views.FeedView.as_view()),
    path('feed/<int:post_id>/', views.FeedView.as_view()),
    path('image/<int:image_id>/', get_image, name='get_image'),
]