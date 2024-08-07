from rest_framework import serializers
from .models import Post, Like, Comment, CommentLike
from Profile.models import Profile

class LikeSerializer(serializers.ModelSerializer):
    like_email = serializers.EmailField(read_only=True, source='user.email')

    class Meta:
        model = Like
        fields = "__all__"

class CommentLikeSerializer(serializers.ModelSerializer):
    liker_email = serializers.EmailField(read_only=True, source='user.email')

    class Meta:
        model = CommentLike
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    commenter_email = serializers.EmailField(read_only=True, source='user.email')
    commenter_name = serializers.CharField(read_only=True, source='user.get_full_name')
    likes_count = serializers.SerializerMethodField()
    dislikes_count = serializers.SerializerMethodField()
    commenter_profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = "__all__"

    def get_likes_count(self, obj):
        return obj.likes.filter(is_like=True).count()

    def get_dislikes_count(self, obj):
        return obj.likes.filter(is_like=False).count()
    
    def get_commenter_profile_picture(self, obj):
        try:
            user_profile = Profile.objects.get(user=obj.user)
            return user_profile.picture.url if user_profile.picture else None
        except Profile.DoesNotExist:
            return None

class PostSerializer(serializers.ModelSerializer):
    likes = LikeSerializer(read_only=True, many=True)
    comments = CommentSerializer(read_only=True, many=True)
    no_of_like = serializers.SerializerMethodField()
    no_of_comment = serializers.SerializerMethodField()
    poster_email = serializers.EmailField(read_only=True, source='user.email')
    poster_id = serializers.IntegerField(read_only=True, source='user.id')
    poster_full_name = serializers.CharField(read_only=True, source='user.get_full_name')
    is_liked = serializers.SerializerMethodField()
    poster_picture = serializers.ImageField(read_only=True, source='user.profile.picture')

    class Meta:
        model = Post
        fields = ['id', 'body', 'image', 'likes', 'comments', 'no_of_like', 'no_of_comment', 'date', 'poster_email', 'poster_id', 'poster_full_name', 'is_liked', 'poster_picture']

    def get_no_of_like(self, obj):
        return obj.no_of_like()

    def get_no_of_comment(self, obj):
        return obj.no_of_comment()

    def create(self, validated_data):
        user = self.context['request'].user
        post = Post.objects.create(user=user, **validated_data)
        return post

    def get_is_liked(self, obj):
        user = self.context['request'].user
        return obj.likes.filter(user=user).exists()
