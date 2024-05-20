from django.urls import path
from . import views

# from Post.views import *

urlpatterns = [
    path('create/', views.PostView.as_view()),
    
    path('comments/', views.PostCommentView.as_view()),

    path('feed/', views.FeedView.as_view()),

    # path('<int:pk>/', SinglePostView.as_view()),
    
    # path('reactions/', PostReactionView.as_view()),
    # path('reactions/<int:pk>/', SinglePostReactionView.as_view()),
    
    # path('comments/<int:pk>/', SinglePostCommentView.as_view()),
    
    # path('comments/reactions/', CommentReactionView.as_view()),
    # path('comments/reactions/<int:pk>/', SingleCommentReactionView.as_view()),
    
    # path('comments/replies/', ReplyView.as_view()),
    # path('comments/replies/<int:pk>/', SingleReplyView.as_view()),
]

    # path('activity/', ActivityView.as_view()),
    # path('repost/', RePostView.as_view()),
    
     
    # path('replies/reactions/', ReplyReactionView.as_view()),
    # path('replies/reactions/<int:pk>/', SingleReplyReactionView.as_view()),
    
    # path('bookmark/', PostBookmarkView.as_view()),