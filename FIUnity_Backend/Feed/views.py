from rest_framework import viewsets, status
from .models import Post, Like, Comment
from .serializers import PostSerializer, LikeSerializer, CommentSerializer
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

# # Creating the post
# @api_view(['POST'])
# def create_post(request):
#     data = request.data.copy()
#     serializer = PostSerializer(data=data, context={'request': request})
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Creating the view set for the posts
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [JWTAuthentication]

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=True, methods=['POST'])
    def likePost(self, request, pk=None):
        post = self.get_object()
        user = request.user
        if post.likes.filter(user=user).exists():
            return Response({'message': 'You have already liked the post'}, status=status.HTTP_400_BAD_REQUEST)

        like = Like.objects.create(user=user, post=post)
        serializer = LikeSerializer(like)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['DELETE'])
    def dislikePost(self, request, pk=None):
        post = self.get_object()
        user = request.user
        like = post.likes.filter(user=user).first()
        if not like:
            return Response({'message': "You haven't liked the post yet."}, status=status.HTTP_400_BAD_REQUEST)

        like.delete()
        return Response({'message': 'Disliked Post so deleted'}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['POST'])
    def comment(self, request, pk=None):
        post = self.get_object()
        user = request.user
        comment = Comment.objects.create(user=user, post=post, comment=request.data['comment'])
        serializer = CommentSerializer(comment)
        return Response({'message': 'Commented on the Post', 'result': serializer.data}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['DELETE'])
    def uncomment(self, request, pk=None):
        post = self.get_object()
        user = request.user
        comment = post.comments.filter(user=user).first()
        if not comment:
            return Response({'message': "You haven't commented on the post yet."}, status=status.HTTP_400_BAD_REQUEST)

        comment.delete()
        return Response({'message': 'Comment deleted'}, status=status.HTTP_204_NO_CONTENT)

    
# Class that retrieves the likes
class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    http_method_names = ['get']
    authentication_classes = [JWTAuthentication]

# Class that retrieves the comments
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    http_method_names = ['get', 'delete']
    authentication_classes = [JWTAuthentication]
