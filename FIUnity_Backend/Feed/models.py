import datetime
from django.db import models
from django.conf import settings
from Authentication.models import AppUser

# Make the model for the post itself
class Post(models.Model):
    body = models.TextField(max_length=500, default="")
    image = models.ImageField(null=True, blank=True, upload_to='image/', default=None)
    user = models.ForeignKey(AppUser, related_name='posts', on_delete=models.CASCADE)
    date = models.DateTimeField(default=datetime.datetime.today)

    class Meta:
        ordering = ["-date"]

    def no_of_like(self):
        return Like.objects.filter(post=self).count()

    def no_of_comment(self):
        return Comment.objects.filter(post=self).count()

# Make the model for the Like class   
class Like(models.Model):
    post = models.ForeignKey(Post, related_name='likes', on_delete=models.CASCADE)
    user = models.ForeignKey(AppUser, related_name='likes', on_delete=models.CASCADE)
    date = models.DateTimeField(default=datetime.datetime.today)

    class Meta:
        ordering = ["-date"]

        unique_together = (('user', 'post'),)
        index_together = (('user', 'post'),)

# Make the model for the Comment class
class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.CASCADE)
    comment = models.TextField(max_length=500, default="")
    date = models.DateTimeField(default=datetime.datetime.today)

    class Meta:
        ordering = ["-date"]



# from django.db import models

# from Authentication.models import AppUser

# class Post(models.Model):
#     user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='posts')
    
#     description = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     likes = models.ManyToManyField(AppUser, related_name='liked_posts')

#     class Meta:
#         verbose_name = 'Post'
#         verbose_name_plural = 'Posts'
    
# class PostImage(models.Model):
#     post = models.ForeignKey(Post, on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='image/')

#     class Meta:
#         verbose_name = 'Post Image'
#         verbose_name_plural = 'Post Images'

#     def __str__(self):
#         return f"Image for Post {self.post.id}"

# class Comment(models.Model):
#     # PID = models.ForeignKey(AppUser, on_delete=models.CASCADE)
#     user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
#     post = models.ForeignKey(Post, on_delete=models.CASCADE)
#     text = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     likes = models.ManyToManyField(AppUser, related_name='liked_comments')

#     class Meta:
#         verbose_name = 'Comment'
#         verbose_name_plural = 'Comments'
#     def __str__(self):
#         return f"Comment by {self.first_name} {self.last_name} on Post {self.post.id}"

# class Likes(models.Model):
#     user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="user_likes")
#     post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post_likes")
