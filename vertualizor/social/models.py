from django.db import models
import random


class Tweet(models.Model):
    content = models.TextField(blank=True, null=True)
    imagePath = models.FileField(upload_to='images/', blank=True, null=True)

    def serlize(self):
        return {
            'id': self.id,
            'content': self.content,
            'likes': random.randint(0, 200)
        }
