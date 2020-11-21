from django.test import TestCase

# Create your tests here.
# run ./manage.py test to test.
from django.contrib.auth import get_user_model
from .models import Tweet
User = get_user_model()


class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='IamANewUser', password='newPassWord')

    def test_user_create(self):
        user = User.objects.get(username='IamANewUser')
        self.assertEqual(self.user.username, 'IamANewUser')

    def test_post_create(self):
        newTweet = Tweet.objects.create(content='new tweet.', user=self.user)
        self.assertEqual(newTweet.id, 1)
        self.assertEqual(newTweet.user, self.user)
        self.assertEqual(newTweet.content, 'new tweet.')
