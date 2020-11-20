from django.db import models
import random
from django.conf import settings
User = settings.AUTH_USER_MODEL


class PostLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timeStamp = models.DateTimeField(auto_now_add=True)


class Tweet(models.Model):
    parent = models.ForeignKey("self", null=True, on_delete=models.SET_NULL)
    # each post corsponded for a spesific user
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timeStamp = models.DateTimeField(auto_now_add=True)
    # user = models.ForeignKey(User, null=True,on_delete=models.SET_null) # top keep posts in case users deleted
    content = models.TextField(blank=True, null=True)
    imagePath = models.FileField(upload_to='images/', blank=True, null=True)
    like = models.ManyToManyField(
        User, related_name='tweet_user', blank=True, through=PostLike)

    class Meta:
        # this reverse the order of tweets but I don't understand how.
        ordering = ["-id"]

    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'likes': random.randint(0, 200)
        }
