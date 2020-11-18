from rest_framework import serializers
from .models import Tweet


class TweetActionsSerlizer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()

    def validate_action(self, value):
        # lower = lower case letter.
        # strip = drop spaces for example "like ".strip() = "like"
        value = value.lower().strip()
        if not value in ['like', 'unlike', 'retweet']:
            raise serializers.ValidationError("this is not avalid action")
        return value


class TweeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['content']  # fields = ['id', 'user', 'content']

    def validate_content(self, value):
        if len(value) > 200:
            raise serializers.ValidationError("This Tweet is too long")
        return value
