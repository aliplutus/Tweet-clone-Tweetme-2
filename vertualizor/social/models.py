from django.db import models
import random


class Tweet(models.Model):
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
