from rest_framework import viewsets, status
from .models import Post, Like, Comment
from .serializers import PostSerializer, LikeSerializer, CommentSerializer
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

# Creating the post
@api_view(['POST'])
def create_post(request):
    data = request.data.copy()
    data.pop('user', None)  # Remove 'user' field from data if present
    serializer = PostSerializer(data=data, context={'request': request})
    if serializer.is_valid():
        serializer.save(user=request.user)  # Pass 'user' explicitly here
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Creating the view set for the posts
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]

    # # update method
    # def put(self, request, pk, *args, **kwargs):
    #     return self.update(request, pk, *args, **kwargs)
    
    # This creates the table that marks who like what post
    @action(detail=True, methods=['POST'])
    def likePost(self, request, pk=None):
        post = Post.objects.get(id=pk)
        user = request.user
        try:
            # Check if the user has already liked the post
            if post.likes.filter(user=user).exists():
                return Response({'message': 'You have already liked the post'}, status=status.HTTP_400_BAD_REQUEST)

            # Create a new like for the post and user
            like = Like.objects.create(user=user, post=post)
            serializer = LikeSerializer(like)  # Use LikeSerializer to serialize the like object
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    # Deletes the user data from the table if the post is disliked
    @action(detail=True, methods=['DELETE'])
    def dislikePost(self, request, pk=None):
        post = Post.objects.get(id=pk)
        user = request.user
        try:
            likes = Like.objects.create(user=user, post=post)
            likes.delete()
        except Exception:
            return Response({'message': "You haven't liked the post yet."})
        response = {'message': 'Disliked Post so deleted'}
        return Response(response, status=status.HTTP_204_NO_CONTENT)
    
    # Section that adds a new comment
    @action(detail=True, methods=['POST'])
    def comment(self, request, pk=None):
        post = Post.objects.get(id=pk)
        user = request.user
        comm = Comment.objects.create(user=user, post=post, comment=request.data['comment'])
        serializer = CommentSerializer(comm, many=False)
        response = {'message': 'commented on the Post', 'result': serializer.data}
        return Response(response, status=status.HTTP_200_OK)
    
    # Section that removes that comment and the user data from the table
    @action(detail=True, methods=['DELETE'])
    def uncomment(self, request, pk=None):
        post = Post.objects.get(id=pk)
        user = request.user
        try:
            comment = Comment.objects.get(user=user, post=post)
            comment.delete()
        except Exception:
            return Response({'message': "You haven't comment on the post yet."})
        response = {'message': 'comment deleted'}
        return Response(response, status=status.HTTP_204_NO_CONTENT)
    
# Class that retrieves the likes
class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    http_method_names = ['get']
    # permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]

# Class that retrieves the comments
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    http_method_names = ['get', 'delete']
    # permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]

    # Method for updates (NOT SURE ABOUT THIS PART)
    @action(detail=True, methods=['DELETE'])
    def uncomment(self, request, pk=None):
        try:
            comment = Comment.objects.get(pk=pk)
            comment.delete()
        except Exception:
            return Response({'message': "You haven't comment on the post yet."})
        response = {'message': 'comment deleted'}
        return Response(response, status=status.HTTP_204_NO_CONTENT)



# import os
# from rest_framework.generics import *
# from Feed.serializers import *
# from rest_framework.authentication import SessionAuthentication, TokenAuthentication
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from .models import *
# from rest_framework.response import Response
# from django.core.serializers import serialize
# from django.http import HttpResponse
# from rest_framework.parsers import MultiPartParser, FormParser
# from django.shortcuts import get_object_or_404
# from django.conf import settings
# from rest_framework import status
# from django.http import HttpResponseRedirect
# from django.urls import reverse
# from rest_framework.permissions import AllowAny 
# from django.views.decorators.http import require_POST
# from django.contrib.auth.decorators import login_required

# # from  import PostImage 


# def check_post_exists_in_response(post, response):
#         for item in response:
#             if post.id == item['id']:
#                 return True
#         return False

# class PostView(CreateAPIView):
    
#     permission_classes = [AllowAny]
#     # permission_classes = [IsAuthenticated]
#     # authentication_classes = [TokenAuthentication]
#     serializer_class = PostSerializer
#     parser_classes = [MultiPartParser, FormParser]
    
#     def post(self, request, *args, **kwargs):
#         print(request.data)
#         try:
#             request.data._mutable = True
#         except AttributeError:
#             pass
#         return super().post(request, *args, **kwargs)
    
#     # def put(self, request, post_id, *args, **kwargs):
#     #     post = get_object_or_404(Post, id=post_id)
#     #     user = request.user

#     #     if user in post.likes.all():
#     #         post.likes.remove(user)
#     #         return Response({'detail': 'Post unliked'}, status=status.HTTP_200_OK)
#     #     else:
#     #         post.likes.add(user)
#     #         return Response({'detail': 'Post liked'}, status=status.HTTP_200_OK)
  
    
# class PostCommentView(ListCreateAPIView):
    
#     permission_classes = [AllowAny]
#     serializer_class = PostCommentSerializer
#     # permission_classes = [IsAuthenticated]
#     # authentication_classes = [TokenAuthentication]
    
#     def get_queryset(self):
        
#         post = self.request.GET.get('post')
#         return Comment.objects.filter(post = post)

    
#     def post(self, request, *args, **kwargs):
#         postId = request.data.get('post')
#         commentData = {
#             'post': postId,
#             'user': 1,  
#             'text': request.data.get('text'), 
#             'created_at': request.data.get('created_at', None),
#         }
#         serializer = PostCommentSerializer(data=commentData)
        
#         print('Before is_valid() call')
#         print(commentData)  # Print the comment data to ensure it's correct
        
#         # Check serializer validation
#         if not serializer.is_valid():
#             print('Serializer is invalid:', serializer.errors)  # Print any errors if present
#             return Response(serializer.errors)
        
#         print('After is_valid() call')
        
#         self.perform_create(serializer)
#         return Response(serializer.data)
    
# class FeedView(views.APIView):

#     permission_classes = [AllowAny]
#     # permission_classes = [IsAuthenticated]
#     # authentication_classes = [TokenAuthentication]

#     def check_post_exists_in_response(self, post, response):
#         # Check if the post is already in the response
#         return any(item['id'] == post.id for item in response)

#     def get(self, request, *args, **kwargs):
#         print(request.user)
#         response = []

#         filtered_post_images = Post.objects.filter(post__id=62)  # Filter by related Post id

#         # Fetch all posts
#         for post in Post.objects.all():
#             if not self.check_post_exists_in_response(post, response):
#                 serialized_post_images = serialize('json', filtered_post_images)
                
#                 serialized_post = {
#                     **PostSerializer(instance=post, context={"request": self.request}).data,
#                     "comments": [],
#                     "image": serialized_post_images,
#                 }
                
#                 # Fetch and include comments for the post
#                 for comment in Comment.objects.filter(post=post):
#                     serialized_post['comments'].append({
#                         "first_name": comment.user.first_name,
#                         "last_name": comment.user.last_name,
#                         "text": comment.text,
#                         "created_at": comment.created_at.strftime('%Y-%m-%d %H:%M:%S'),
#                     })
    
#                 response.append(serialized_post)
#         return Response(response)

# def get_image(request, image_id):
#     post_image = get_object_or_404(Post, post_id=image_id)

#     # Construct the path to the image file
#     image_path = os.path.join(settings.MEDIA_ROOT, str(post_image.image))

#     # Open the image file
#     with open(image_path, 'rb') as f:
#         # Read the content of the image file
#         image_data = f.read()

#     # Serve the image file as an HTTP response
#     return HttpResponse(image_data, content_type="image/jpeg")  # Adjust content_type based on your image type

# @login_required
# def like(request, post_id):
#     post = get_object_or_404(Post, id=post_id)
#     user = request.user
    
#     if user in post.likes.all():
#         return HttpResponse("You have already liked this post.")

#     post.likes.add(user)
#     like_count = post.likes.count()
    
#     return HttpResponse(f"Post liked successfully. Total likes: {like_count}")

#     # user = request.user
#     # post = get_object_or_404(Post, id=post_id)
#     # liked, created = Likes.objects.get_or_create(user=user, post=post)
#     # if created:
#     #     post.likes += 1
#     #     post.save()
#     #     return HttpResponse('Post liked successfully', status=200)
#     # else:
#     #     liked.delete()
#     #     post.likes -= 1
#     #     post.save()
#     #     return HttpResponse('Post unliked successfully', status=200)