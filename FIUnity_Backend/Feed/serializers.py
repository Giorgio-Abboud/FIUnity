from rest_framework import serializers
from .models import Post, Like, Comment

# Create the serializer for Post
class LikeSerializer(serializers.ModelSerializer):
    like_email = serializers.EmailField(read_only=True, source='user.email')

    class Meta:
        model = Like
        fields = "__all__"

# Create the serializer for Post
class CommentSerializer(serializers.ModelSerializer):
    commenter_email = serializers.EmailField(read_only=True, source='user.email')

    class Meta:
        model = Comment
        fields = "__all__"

# Create the serializer for Post
class PostSerializer(serializers.ModelSerializer):
    likes = LikeSerializer(read_only=True, many=True)
    comments = CommentSerializer(read_only=True, many=True)
    no_of_like = serializers.SerializerMethodField()
    no_of_comment = serializers.SerializerMethodField()
    poster_email = serializers.EmailField(read_only=True, source='user.email')

    class Meta:
        model = Post
        fields = ['id', 'body', 'image', 'likes', 'comments', 'no_of_like', 'no_of_comment', 'date', 'poster_email']

    def get_no_of_like(self, obj):
        return obj.no_of_like()

    def get_no_of_comment(self, obj):
        return obj.no_of_comment()

    def create(self, validated_data):
        # Extract the authenticated user from the request context
        # user = self.context['request'].user
        # Create a new Post instance with the validated data
        post = Post.objects.create(**validated_data)
        return post

