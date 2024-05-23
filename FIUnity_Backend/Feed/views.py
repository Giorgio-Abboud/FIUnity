from rest_framework.generics import *
from Feed.serializers import *
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import *
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


def check_post_exists_in_response(post, response):
        for item in response:
            if post.id == item['id']:
                return True
        return False

class PostView(CreateAPIView):
    
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = PostSerializer
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        try:
            request.data._mutable = True
        except AttributeError:
            pass
        return super().post(request, *args, **kwargs)
    
    
class PostCommentView(ListCreateAPIView):
    
    serializer_class = PostCommentSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    
    def get_queryset(self):
        
        post = self.request.GET.get('post')
        return Comment.objects.filter(post = post)
    
    # def post(self, request, *args, **kwargs):
    #     postId = request.data.get('post')
    #     commentData = {
    #         'post': postId,
    #         'user': 1,  
    #         'text': request.data.get('description'), 
    #         'created_at': request.data.get('created_at', None),
    #     }
    #     serializer = PostCommentSerializer(data=commentData)
    #     print('start')
    #     serializer.is_valid(raise_exception=True)
    #     print('done')
    #     self.perform_create(serializer)
    #     return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        postId = request.data.get('post')
        commentData = {
            'post': postId,
            'user': 1,  
            'text': request.data.get('text'), 
            'created_at': request.data.get('created_at', None),
        }
        serializer = PostCommentSerializer(data=commentData)
        
        print('Before is_valid() call')
        print(commentData)  # Print the comment data to ensure it's correct
        
        # Check serializer validation
        if not serializer.is_valid():
            print('Serializer is invalid:', serializer.errors)  # Print any errors if present
            return Response(serializer.errors)
        
        print('After is_valid() call')
        
        self.perform_create(serializer)
        return Response(serializer.data)

            
class FeedView(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def check_post_exists_in_response(self, post, response):
        # Check if the post is already in the response
        return any(item['id'] == post.id for item in response)

    def get(self, request, *args, **kwargs):
        print(request.user)
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
                        "created_at": comment.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                    })

                response.append(serialized_post)
        return Response(response)
