from rest_framework import status
from rest_framework.generics import *
from Post.serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import *
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from itertools import chain
from django.contrib.postgres.search import SearchVector, SearchQuery, TrigramSimilarity
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination

class PostView(CreateAPIView):
    
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    
    def post(self, request, *args, **kwargs):
        
        print(request.data)
        try:
            request.data._mutable = True
        except AttributeError:
            pass
        # request.data.update({"post_owner" : Profile.objects.get(user = request.user).id,
        #                      "parent_post": None})
        return super().post(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        # post_reaction = get_object_or_404(PostReaction,id = kwargs['pk'])
        # if not post_reaction.reacted_by.user == self.request.user:
        #     return Response({"detail": "You are not allowed to perform this action"},
        #                     status = status.HTTP_405_METHOD_NOT_ALLOWED)
        return super().delete(request, *args, **kwargs)
    
    
class PostCommentView(ListCreateAPIView):
    
    permission_classes = [IsAuthenticated]
    serializer_class = PostCommentSerializer
    
    def get_queryset(self):
        
        post = self.request.GET.get('post')
        return Comment.objects.filter(post = post)
    
    def post(self, request, *args, **kwargs):
        # request.data.update({"comment_owner" : Profile.objects.get(user = request.user).id})
        return super().post(request, *args, **kwargs)
        
    
class ReplyView(ListCreateAPIView):
    
    permission_classes = [IsAuthenticated]
    serializer_class = ReplySerializer
    
    def get_queryset(self):
        comment = self.request.GET.get('comment')
        return CommentReply.objects.filter(comment = comment)
    
    def post(self, request, *args, **kwargs):
        # request.data.update({"reply_owner" : Profile.objects.get(user = request.user).id})
        return super().post(request, *args, **kwargs)


    def post(self, request, *args, **kwargs):
        # request.data.update({"reaction_owner" : Profile.objects.get(user = request.user).id})
        return super().post(request, *args, **kwargs)
    

def check_post_exists_in_response(post, response):
        for item in response:
            if post.id == item['id']:
                return True
        return False  
      
class ActivityView(ListAPIView):
    
    permission_classes = [IsAuthenticated]
    serializer_class = ActivitySerializer
    
    # pagination_class = BasicPagination
    
    def get_queryset(self):
        # profile = get_object_or_404(Profile, user = self.request.user)
        
        # queryset1 = Post.objects.filter(post_owner = profile).order_by('-created_at')
        # # queryset2 = PostReaction.objects.filter(reacted_by= profile)
        
        # queryset3 = Comment.objects.filter(comment_owner = profile).order_by('-created_at')
        # queryset4 = CommentReaction.objects.filter(reaction_owner = profile)
        
        # queryset5 = CommentReply.objects.filter(reply_owner = profile).order_by('-created_at')
        # queryset6 = ReplyReaction.objects.filter(reaction_owner = profile)
        
        model_combination = list(chain(queryset1, queryset2, queryset3, queryset4, queryset5, queryset6))
        return model_combination

   
    

      
    