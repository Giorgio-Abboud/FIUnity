# from rest_framework import status
from rest_framework.generics import *
from Feed.serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import *
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from itertools import chain
from django.contrib.postgres.search import SearchVector, SearchQuery, TrigramSimilarity
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination


def check_post_exists_in_response(post, response):
        for item in response:
            if post.id == item['id']:
                return True
        return False  

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
    
    # def delete(self, request, *args, **kwargs):
    #     # post_reaction = get_object_or_404(PostReaction,id = kwargs['pk'])
    #     # if not post_reaction.reacted_by.user == self.request.user:
    #     #     return Response({"detail": "You are not allowed to perform this action"},
    #     #                     status = status.HTTP_405_METHOD_NOT_ALLOWED)
    #     return super().delete(request, *args, **kwargs)
    
    
class PostCommentView(ListCreateAPIView):
    
    # permission_classes = [IsAuthenticated]
    serializer_class = PostCommentSerializer
    
    def get_queryset(self):
        
        post = self.request.GET.get('post')
        return Comment.objects.filter(post = post)
    
    def post(self, request, *args, **kwargs):
        # request.data.update({"comment_owner" : Profile.objects.get(user = request.user).id})
        return super().post(request, *args, **kwargs)
        
class FeedView(views.APIView):
    
    permission_classes = [IsAuthenticated]

    
    def get(self, request, *args, **kwargs):
        response = list()
        
        following_profiles = self.request.user.following.all()
        for profile in following_profiles:
            
            for reaction in profile.post_reactions.all():
                if not check_post_exists_in_response(reaction.post,response):
                    
                    data = PostSerializer(instance = reaction.post, context = {"request": self.request}).data
                    # data['message'] = f"{reaction.post.post_owner.full_name} reacted to this Post."
                    response.append(data)

            for comment in profile.comment_set.all():
                if not check_post_exists_in_response(comment.post,response):
                    data = PostSerializer(instance = comment.post, context = {"request": self.request}).data
                    data['message'] = f"{comment.post.post_owner.full_name} commented on this Post."
                    response.append(data)
                    
            for post in profile.created_posts.all():
                if not check_post_exists_in_response(post,response):
                    data = PostSerializer(instance = post, context = {"request": self.request}).data
                    response.append(data)
                    
        for post in Post.objects.all():
            if not check_post_exists_in_response(post,response):
                data = PostSerializer(instance = post, context = {"request": self.request}).data
                response.append(data)
                
        page = self.paginate_queryset(response)
        return self.get_paginated_response(page)

