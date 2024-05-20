from django.db import models

from Authentication.models import AppUser

class Post(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    parent_post = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null = True)
    description = models.TextField()
      
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'
    
    # def __str__(self):
    #     return f"{self.post_owner.full_name}--> Post{self.id}"
    
    
class PostImages(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='post/images/')
    
    class Meta:
        verbose_name = 'Post Image'
        verbose_name_plural = 'Post Images'
     

class Comment(models.Model):
    PID = models.ForeignKey(AppUser, on_delete=models.CASCADE)

    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()
    
    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'
    