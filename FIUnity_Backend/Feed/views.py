from rest_framework import viewsets, status
from .models import Post, Like, Comment, CommentLike, Repost
from .serializers import PostSerializer, LikeSerializer, CommentSerializer, RepostSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

# Creating the view set for the posts
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [JWTAuthentication]

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=True, methods=['POST'])
    def repost(self, request, pk=None):
        try:
            post = self.get_object()
            user = request.user
            existing_repost = post.reposts.filter(user=user).first()

            if existing_repost:
                return Response({'message': 'You have already reposted this post'}, status=status.HTTP_400_BAD_REQUEST)

            Repost.objects.create(user=user, original_post=post)

            return Response({
                'message': 'Post reposted',
                'reposts_count': post.reposts.count(),
                'original_post_id': post.id,  # Include the original post ID
                'date': Repost.objects.get(original_post=post, user=user).date.isoformat(),  # Include the repost date
            }, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error in repost method: {e}")
            return Response({'message': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @action(detail=True, methods=['POST'])
    def unrepost(self, request, pk=None):
        post = self.get_object()
        user = request.user
        existing_repost = post.reposts.filter(user=user).first()

        if not existing_repost:
            return Response({'message': "You haven't reposted this post yet."}, status=status.HTTP_400_BAD_REQUEST)

        existing_repost.delete()
        return Response({'message': 'Repost removed', 'reposts_count': post.reposts.count()}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['GET'])
    def get_reposts(self, request, pk=None):
        reposts = Repost.objects.filter(original_post_id=pk)
        serializer = RepostSerializer(reposts, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'])
    def likePost(self, request, pk=None):
        post = self.get_object()
        user = request.user
        existing_like = post.likes.filter(user=user).first()

        if existing_like:
            # User has already liked the post, so remove the like
            existing_like.delete()
            return Response({'message': 'Like removed', 'likes_count': post.likes.count()}, status=status.HTTP_200_OK)
        
        # Add a new like
        Like.objects.create(user=user, post=post)
        return Response({'message': 'Post liked', 'likes_count': post.likes.count()}, status=status.HTTP_200_OK)


    # @action(detail=True, methods=['POST'])
    # def dislikePost(self, request, pk=None):
    #     post = self.get_object()
    #     user = request.user
    #     existing_dislike = post.dislikes.filter(user=user).first()

    #     if existing_dislike:
    #         # User has already disliked the post, so remove the dislike
    #         existing_dislike.delete()
    #         return Response({'message': 'Dislike removed', 'dislikes_count': post.dislikes.count()}, status=status.HTTP_200_OK)

    #     # Add a new dislike
    #     Dislike.objects.create(user=user, post=post)
    #     return Response({'message': 'Post disliked', 'dislikes_count': post.dislikes.count()}, status=status.HTTP_200_OK)

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
    http_method_names = ['get', 'post', 'delete']
    authentication_classes = [JWTAuthentication]

    @action(detail=True, methods=['POST'])
    def likeComment(self, request, pk=None):
        comment = Comment.objects.get(pk=pk)
        user = request.user
        existing_like = CommentLike.objects.filter(comment=comment, user=user).first()

        if existing_like:
            if existing_like.is_like:
                existing_like.delete()
                return Response({'message': 'Like removed', 'likes_count': comment.likes.filter(is_like=True).count()}, status=status.HTTP_200_OK)
            else:
                existing_like.is_like = True
                existing_like.save()
                return Response({'message': 'Changed dislike to like', 'likes_count': comment.likes.filter(is_like=True).count()}, status=status.HTTP_200_OK)
        else:
            CommentLike.objects.create(user=user, comment=comment, is_like=True)
            return Response({'message': 'Comment liked', 'likes_count': comment.likes.filter(is_like=True).count()}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'])
    def dislikeComment(self, request, pk=None):
        comment = Comment.objects.get(pk=pk)
        user = request.user
        existing_like = CommentLike.objects.filter(comment=comment, user=user).first()

        if existing_like:
            if not existing_like.is_like:
                existing_like.delete()
                return Response({'message': 'Dislike removed', 'dislikes_count': comment.likes.filter(is_like=False).count()}, status=status.HTTP_200_OK)
            else:
                existing_like.is_like = False
                existing_like.save()
                return Response({'message': 'Changed like to dislike', 'dislikes_count': comment.likes.filter(is_like=False).count()}, status=status.HTTP_200_OK)
        else:
            CommentLike.objects.create(user=user, comment=comment, is_like=False)
            return Response({'message': 'Comment disliked', 'dislikes_count': comment.likes.filter(is_like=False).count()}, status=status.HTTP_200_OK)