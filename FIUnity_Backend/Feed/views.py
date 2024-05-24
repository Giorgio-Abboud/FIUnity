
from rest_framework.generics import *
from Feed.serializers import *
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import *
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.core.serializers import serialize
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django.conf import settings
import os
from rest_framework.permissions import AllowAny 

# from  import PostImage 


def check_post_exists_in_response(post, response):
        for item in response:
            if post.id == item['id']:
                return True
        return False

class PostView(CreateAPIView):
    
    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]
    serializer_class = PostSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        try:
            request.data._mutable = True
        except AttributeError:
            pass
        return super().post(request, *args, **kwargs)
    
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print('Serializer errors:', serializer.errors)
            return Response(serializer.errors, status=400)
        
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)   
    
class PostCommentView(ListCreateAPIView):
    
    permission_classes = [AllowAny]
    # serializer_class = PostCommentSerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]
    
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

    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]

    def check_post_exists_in_response(self, post, response):
        # Check if the post is already in the response
        return any(item['id'] == post.id for item in response)

    def get(self, request, *args, **kwargs):
        print(request.user)
        response = []

        filtered_post_images = PostImage.objects.filter(post__id=62)  # Filter by related Post id

        # Fetch all posts
        for post in Post.objects.all():
            if not self.check_post_exists_in_response(post, response):
                serialized_post_images = serialize('json', filtered_post_images)
                
                serialized_post = {
                    **PostSerializer(instance=post, context={"request": self.request}).data,
                    "comments": [],
                    "image": serialized_post_images,
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

def get_image(request, image_id):
    post_image = get_object_or_404(PostImage, post_id=image_id)

    # Construct the path to the image file
    image_path = os.path.join(settings.MEDIA_ROOT, str(post_image.image))

    # Open the image file
    with open(image_path, 'rb') as f:
        # Read the content of the image file
        image_data = f.read()

    # Serve the image file as an HTTP response
    return HttpResponse(image_data, content_type="image/jpeg")  # Adjust content_type based on your image type

