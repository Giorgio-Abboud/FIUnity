from django.db import models

from Authentication.models import AppUser

class Post(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='posts')
    
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'
    
class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='image/')

    class Meta:
        verbose_name = 'Post Image'
        verbose_name_plural = 'Post Images'

    def __str__(self):
        return f"Image for Post {self.post.id}"

class Comment(models.Model):
    # PID = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'
    def __str__(self):
        return f"Comment by {self.first_name} {self.last_name} on Post {self.post.id}"
