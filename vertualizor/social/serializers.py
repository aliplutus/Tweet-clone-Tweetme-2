from rest_framework import serializers
from .models import Tweet


class TweetActionsSerlizer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        # lower = lower case letter.
        # strip = drop spaces for example "like ".strip() = "like"
        value = value.lower().strip()
        if not value in ['like', 'unlike', 'retweet']:
            raise serializers.ValidationError("this is not avalid action")
        return value


class CreateTweeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['id', 'content', 'like']

    # def get_likes(self, obj):
        # return obj.like.count()
        # this convert the array of users ids wholiekd to the number of likes

    def validate_content(self, value):
        if len(value) > 200:
            raise serializers.ValidationError("This Tweet is too long")
        return value


class TweeSerializers(serializers.ModelSerializer):
    # like = serializers.SerializerMethodField(read_only=True)
    # if the is no is_retweet @property function in models  you will nedd this line.
    # is_retweet = serializers.SerializerMethodField(read_only=True)
    # content = serializers.SerializerMethodField(read_only=True)
    # this will retrun the data of parents.
    # http://127.0.0.1:8000/posts/ parent:{id,content,like}
    parent = CreateTweeSerializers(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'like',
                  'is_retweet', 'parent', 'user']

    # def get_content(self, obj):
    #     content = obj.content
    #     # if th it is a retweet then its content will = the content of the parent.
    #     # this is to make sure that the already existed tweets will have the content of their parents.
    #     if obj.is_retweet:
    #         content = obj.parent.content
    #     return content
