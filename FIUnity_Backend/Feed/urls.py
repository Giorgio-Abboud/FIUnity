from rest_framework import routers
from django.conf.urls import include
from django.urls import path
from .views import PostViewSet, LikeViewSet, CommentViewSet
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register('posts', PostViewSet)
router.register('likes', LikeViewSet)
router.register('comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
