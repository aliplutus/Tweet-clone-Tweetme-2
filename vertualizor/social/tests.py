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
        User.objects.create_user(
            username='IamANewUser2', password='newPassWord2')

    def test_user_create(self):
        user = User.objects.get(username='IamANewUser')
        self.assertEqual(self.user.username, 'IamANewUser')
        user = User.objects.get(username='IamANewUser2')
        self.assertEqual(user.username, 'IamANewUser2')
