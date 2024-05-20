from django.db import models
<<<<<<< HEAD:FIUnity_Backend/Homepage/models.py
=======

from Authentication.models import AppUser
>>>>>>> a300f3c908ce1d41dbb59b69c2f2c16b71b1bf91:FIUnity_Backend/Feed/models.py

class Post(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
<<<<<<< HEAD:FIUnity_Backend/Homepage/models.py
    parent_post = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True, related_name='replies')
=======

    parent_post = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null = True)
>>>>>>> a300f3c908ce1d41dbb59b69c2f2c16b71b1bf91:FIUnity_Backend/Feed/models.py
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.description[:30]}"

class PostImages(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='post/images/')

    class Meta:
        verbose_name = 'Post Image'
        verbose_name_plural = 'Post Images'

    def __str__(self):
        return f"Image for Post {self.post.id}"

class Comment(models.Model):
<<<<<<< HEAD:FIUnity_Backend/Homepage/models.py
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
=======
    PID = models.ForeignKey(AppUser, on_delete=models.CASCADE)

>>>>>>> a300f3c908ce1d41dbb59b69c2f2c16b71b1bf91:FIUnity_Backend/Feed/models.py
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'

    def __str__(self):
        return f"Comment by {self.first_name} {self.last_name} on Post {self.post.id}"
