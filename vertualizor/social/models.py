from django.db import models
import random
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Tweet(models.Model):
    # each post corsponded for a spesific user
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # user = models.ForeignKey(User, null=True,on_delete=models.SET_null) # top keep posts in case users deleted
    content = models.TextField(blank=True, null=True)
    imagePath = models.FileField(upload_to='images/', blank=True, null=True)

    class Meta:
        # this reverse the order of tweets but I don't understand how.
        ordering = ["-id"]

    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'likes': random.randint(0, 200)
        }
