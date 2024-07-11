from rest_framework import serializers
from .models import Post, Like, Comment

# Create the serializer for Post
class LikeSerializer(serializers.Serializer):
    class Meta:
        model = Like
        fields = "__all__"

# Create the serializer for Post
class CommentSerializer(serializers.Serializer):
    class Meta:
        model = Comment
        fields = "__all__"

# Create the serializer for Post
class PostSerializer(serializers.Serializer):
    likes = LikeSerializer(read_only=True, many=True)
    comments = CommentSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = ['id', 'body', 'image', 'user', 'likes', 'comments', 'no_of_like', 'no_of_comment']

    def create(self, validated_data):
        # Extract the authenticated user from the request context
        user = self.context['request'].user
        # Create a new Post instance with the validated data
        post = Post.objects.create(user=user, **validated_data)
        return post

