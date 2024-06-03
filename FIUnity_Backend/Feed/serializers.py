from rest_framework import serializers
from Feed.models import Post, PostImage, Comment

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['image']

class PostSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    images_data = PostImageSerializer(many=True, read_only=True)
    comments_count = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'description', 'created_at', 'likes_count','images', 'images_data', 'comments_count']
        extra_kwargs = {
            'description': {'required': False}  
        }

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comment_set.count()

    def create(self, validated_data):
        images = validated_data.pop('images', [])
        post = Post.objects.create(**validated_data)
        
        post_images_list = [PostImage(post=post, image=image) for image in images]
        if post_images_list:
            PostImage.objects.bulk_create(post_images_list)
        
        return post

class PostCommentSerializer(serializers.ModelSerializer):
    # likes_count = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = '__all__'

    # def get_likes_count(self, obj):
    #     return obj.likes.count()

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)
