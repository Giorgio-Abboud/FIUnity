# from rest_framework import status
from rest_framework.generics import *
from Feed.serializers import *
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import *
from rest_framework.pagination import PageNumberPagination


def check_post_exists_in_response(post, response):
        for item in response:
            if post.id == item['id']:
                return True
        return False

class PostView(CreateAPIView):
    
    permission_classes = [AllowAny]
    serializer_class = PostSerializer
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        try:
            request.data._mutable = True
        except AttributeError:
            pass
        return super().post(request, *args, **kwargs)
    
    
class PostCommentView(ListCreateAPIView):
    
    permission_classes = [AllowAny]
    serializer_class = PostCommentSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def get_queryset(self):
        
        post = self.request.GET.get('post')
        return Comment.objects.filter(post = post)
    
    def post(self, request, *args, **kwargs):
        # request.data.update({"comment_owner" : Profile.objects.get(user = request.user).id})
        return super().post(request, *args, **kwargs)
        
class FeedView(views.APIView):
    permission_classes = [AllowAny]

    def check_post_exists_in_response(self, post, response):
        # Check if the post is already in the response
        return any(item['id'] == post.id for item in response)

    def get(self, request, *args, **kwargs):
        response = []

        # Fetch all posts
        for post in Post.objects.all():
            if not self.check_post_exists_in_response(post, response):
                serialized_post = {
                    **PostSerializer(instance=post, context={"request": self.request}).data,
                    "comments": []
                }
                
                # Fetch and include comments for the post
                for comment in Comment.objects.filter(post=post):
                    serialized_post['comments'].append({
                        "first_name": comment.user.first_name,
                        "last_name": comment.user.last_name,
                        "text": comment.text,
                    })

                response.append(serialized_post)

        # Pagination
        return Response(response)
