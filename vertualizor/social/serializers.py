from rest_framework import serializers
from .models import Tweet


class TweeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['content']  # fields = ['id', 'user', 'content']

    def validate_content(self, value):
        if len(value) > 200:
            raise serializers.ValidationError("This Tweet is too long")
        return value
