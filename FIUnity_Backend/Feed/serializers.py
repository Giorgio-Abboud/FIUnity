from rest_framework import serializers
from .models import Post, Like, Comment

class LikeSerializer(serializers.ModelSerializer):
    like_email = serializers.EmailField(read_only=True, source='user.email')

    class Meta:
        model = Like
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    commenter_email = serializers.EmailField(read_only=True, source='user.email')
    commenter_name = serializers.CharField(read_only=True, source='user.get_full_name')

    class Meta:
        model = Comment
        fields = ['id', 'comment', 'date', 'commenter_email', 'commenter_name']

class PostSerializer(serializers.ModelSerializer):
    likes = LikeSerializer(read_only=True, many=True)
    comments = CommentSerializer(read_only=True, many=True)
    no_of_like = serializers.SerializerMethodField()
    no_of_comment = serializers.SerializerMethodField()
    poster_email = serializers.EmailField(read_only=True, source='user.email')
    poster_id = serializers.IntegerField(read_only=True, source='user.id')
    poster_full_name = serializers.CharField(read_only=True, source='user.get_full_name')  # Using get_full_name property

    class Meta:
        model = Post
        fields = ['id', 'body', 'image', 'likes', 'comments', 'no_of_like', 'no_of_comment', 'date', 'poster_email', 'poster_id', 'poster_full_name']

    def get_no_of_like(self, obj):
        return obj.no_of_like()

    def get_no_of_comment(self, obj):
        return obj.no_of_comment()

    def create(self, validated_data):
        user = self.context['request'].user
        post = Post.objects.create(user=user, **validated_data)
        return post
