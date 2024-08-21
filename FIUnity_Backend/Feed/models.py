from django.utils import timezone
import datetime
from django.db import models
from django.conf import settings
from Authentication.models import AppUser
import datetime

# Make the model for the post itself
class Post(models.Model):
    body = models.TextField(max_length=500, default="")
    image = models.ImageField(null=True, blank=True, upload_to='image/', default=None)
    user = models.ForeignKey(AppUser, related_name='posts', on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    

    class Meta:
        ordering = ["-date"]

    def no_of_likes(self):
        return Like.objects.filter(post=self).count()

    def no_of_comments(self):
        return Comment.objects.filter(post=self).count()

# Make the model for the Like class   
class Like(models.Model):
    post = models.ForeignKey(Post, related_name='likes', on_delete=models.CASCADE)
    user = models.ForeignKey(AppUser, related_name='likes', on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["-date"]
        unique_together = (('user', 'post'),)
        indexes = [
            models.Index(fields=['user', 'post']),
        ]

# Make the model for the Comment class
class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.CASCADE)
    comment = models.TextField(max_length=500, default="")
    date = models.DateTimeField(default=timezone.now)

    def no_of_likes(self):
        return self.likes.count()

    class Meta:
        ordering = ["-date"]

class CommentLike(models.Model):
    comment = models.ForeignKey(Comment, related_name='likes', on_delete=models.CASCADE)
    user = models.ForeignKey(AppUser, related_name='comment_likes', on_delete=models.CASCADE)
    is_like = models.BooleanField(default=True)  # True for like, False for dislike
    date = models.DateTimeField(default=datetime.datetime.today)

    class Meta:
        # ordering = ["-date"]
        unique_together = (('user', 'comment'),)
        index_together = (('user', 'comment'),)

class Repost(models.Model):
    original_post = models.ForeignKey(Post, related_name='reposts', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='reposts', on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = (('original_post', 'user'),)
        ordering = ["-date"]

    def __str__(self):
        return f"{self.user.email} reposted {self.original_post.body[:20]}"

    def no_of_likes(self):
        return self.likes.count()
    
    def no_of_comments(self):
        return self.comments.count()
    
    def poster_profile(self):
        return self.user.profile

class RepostLike(models.Model):
    repost = models.ForeignKey(Repost, related_name='likes', on_delete=models.CASCADE)
    user = models.ForeignKey(AppUser, related_name='repost_likes', on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["-date"]
        unique_together = (('user', 'repost'),)
        indexes = [
            models.Index(fields=['user', 'repost']),
        ]

class RepostComment(models.Model):
    repost = models.ForeignKey(Repost, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(AppUser, related_name='repost_comments', on_delete=models.CASCADE)
    body = models.TextField()
    date = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["-date"]