from rest_framework import serializers
from .models import Post, Like, Comment, CommentLike, Repost
from Profile.models import Profile
from Profile.serializers import UserProfileSerializer

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
    commenter_status = serializers.SerializerMethodField()

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
    
    def get_commenter_status(self, obj):
        try:
            user_profile = Profile.objects.get(user=obj.user)
            return user_profile.status if user_profile.status else None
        except Profile.DoesNotExist:
            return None

class PostSerializer(serializers.ModelSerializer):
    likes = LikeSerializer(read_only=True, many=True)
    comments = CommentSerializer(read_only=True, many=True)
    no_of_likes = serializers.SerializerMethodField()
    no_of_comments = serializers.SerializerMethodField()
    poster_profile = UserProfileSerializer(source='user.profile', read_only=True)
    reposts_count = serializers.SerializerMethodField()
    is_reposted = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'body', 'image', 'likes', 'comments', 'no_of_likes', 'no_of_comments',
                   'date', 'poster_profile', 'reposts_count', 'is_reposted']

    def get_no_of_likes(self, obj):
        return obj.no_of_likes()

    def get_no_of_comments(self, obj):
        return obj.no_of_comments()
    
    def get_reposts_count(self, obj):
        return obj.reposts.count()

    def get_is_reposted(self, obj):
        user = self.context['request'].user
        return obj.reposts.filter(reposted_by=user).exists()

    # def get_is_liked(self, obj):
    #     user = self.context['request'].user
    #     return obj.likes.filter(user=user).exists()
    
    def create(self, validated_data):
        user = self.context['request'].user
        post = Post.objects.create(user=user, **validated_data)
        return post

class RepostSerializer(serializers.ModelSerializer):
    original_post = PostSerializer(read_only=True)  # Includes original post data
    poster_profile = UserProfileSerializer(source='user.profile', read_only=True)
    no_of_likes = serializers.SerializerMethodField()
    no_of_comments = serializers.SerializerMethodField()

    class Meta:
        model = Repost
        fields = ['id', 'original_post', 'date', 'no_of_likes', 'no_of_comments', 'poster_profile']

    def get_no_of_likes(self, obj):
        return obj.no_of_likes()

    def get_no_of_comments(self, obj):
        return obj.no_of_comments()
