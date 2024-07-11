from rest_framework import routers
from django.conf.urls import include
from django.urls import path
from .views import PostViewSet, LikeViewSet, CommentViewSet, create_post
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register('posts', PostViewSet)
router.register('likes', LikeViewSet)
router.register('comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('create_post/', create_post),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]



# from django.urls import path
# from . import views
# from .views import get_image

# urlpatterns = [
#     path('posts/', views.PostView.as_view()),
#     path('posts/<int:post_id>/like/', views.like, name='post-like'),    
#     path('comments/', views.PostCommentView.as_view()),
#     # path('comments/<int:comment_id>/like/', views.PostCommentView.as_view()),
#     path('feed/', views.FeedView.as_view()),
#     path('feed/<int:post_id>/', views.FeedView.as_view()),
#     path('image/<int:image_id>/', get_image, name='get_image'),
# ]