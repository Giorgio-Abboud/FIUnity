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



# from rest_framework import serializers
# from Feed.models import Post, Comment

# class PostImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = ['image']

# class PostSerializer(serializers.ModelSerializer):
#     images = serializers.ListField(
#         child=serializers.ImageField(), write_only=True, required=False
#     )
#     images_data = PostImageSerializer(many=True, read_only=True)
#     comments_count = serializers.SerializerMethodField()
#     likes_count = serializers.SerializerMethodField()
#     created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

#     class Meta:
#         model = Post
#         fields = ['id', 'user', 'description', 'created_at', 'likes_count','images', 'images_data', 'comments_count']
#         extra_kwargs = {
#             'description': {'required': False}, 
#             'likes': {'required': False}
#         }

#     def get_likes_count(self, obj):
#         return obj.likes.count()

#     def get_comments_count(self, obj):
#         return obj.comment_set.count()

#     # def create(self, validated_data):
#     #     images = validated_data.pop('images', [])
#     #     post = Post.objects.create(**validated_data)
        
#     #     post_images_list = [PostImage(post=post, image=image) for image in images]
#     #     if post_images_list:
#     #         PostImage.objects.bulk_create(post_images_list)
        
#     #     return post

# class PostCommentSerializer(serializers.ModelSerializer):
#     # likes_count = serializers.SerializerMethodField()
#     class Meta:
#         model = Comment
#         fields = '__all__'
#         read_only_fields = ['likes']

#     # def get_likes_count(self, obj):
#     #     return obj.likes.count()

#     def create(self, validated_data):
#         return Comment.objects.create(**validated_data)
