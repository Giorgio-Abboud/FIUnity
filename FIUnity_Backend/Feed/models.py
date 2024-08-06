from django.utils import timezone
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

    def no_of_like(self):
        return Like.objects.filter(post=self).count()

    def no_of_comment(self):
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

    def no_of_like(self):
        return self.likes.count()

    class Meta:
        ordering = ["-date"]

class CommentLike(models.Model):
    comment = models.ForeignKey(Comment, related_name='likes', on_delete=models.CASCADE)
    user = models.ForeignKey(AppUser, related_name='comment_likes', on_delete=models.CASCADE)
    is_like = models.BooleanField(default=True)  # True for like, False for dislike
    date = models.DateTimeField(default=datetime.datetime.today)

    class Meta:
        ordering = ["-date"]
        unique_together = (('user', 'comment'),)
        index_together = (('user', 'comment'),)

