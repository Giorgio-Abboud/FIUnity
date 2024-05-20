from rest_framework import serializers, status
from Feed.models import *
from Authentication.utils import CustomValidation
from django.shortcuts import get_object_or_404
from django.db.utils import IntegrityError
import re
 
class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImages
        fields = ['image']   
         
       
class PostSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only = True, required = False )
    
    class Meta:
        model = Post
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
            
        # ---- To avoid loop of continous serialization --------
        count = 0
        try:
            count = self.context['count']
        except KeyError:
            pass
        # ------------------------------------------------------
        if instance.parent_post is not None and count == 0:
            data['parent_post_data'] = PostSerializer(instance = instance.parent_post,
                                                      context = {"request": self.context['request'], "count": 1}).data
        
        post_images = PostImages.objects.filter(post = instance)
        data['images_data'] = PostImageSerializer(instance = post_images , many = True).data
        
        data['created_at'] = instance.created_at.strftime("%Y-%m-%d %H:%M:%S")
        
        post_comments = Comment.objects.filter(post = instance)
        replies_count=0
        for post_comment in post_comments:
            replies_count += post_comment.commentreply_set.all().count()
        data['comments_count'] = len(data.pop('commented_by')) + replies_count
        
        return data
        
        
    def create(self, validated_data):
        
        try:
            images = validated_data.pop('images')
        except KeyError:
            images = []
        
        post = super().create(validated_data)
        
        
        post_images_list=[]
        for image in images: 
            post_images_list.append(
                PostImages(post = post, image = image)
            )
        if post_images_list:
            PostImages.objects.bulk_create(post_images_list)
        return post
    
            
class PostCommentSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Comment
        fields = "__all__"


    def to_representation(self, instance):
        data = super().to_representation(instance)
        
        data['created_at'] = instance.created_at.strftime("%Y-%m-%d %H:%M:%S")
        return data
    
    def create(self, validated_data):
        comment =  super().create(validated_data)
        return comment     
        