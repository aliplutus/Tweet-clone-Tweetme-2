from django.contrib.auth import get_user_model
from rest_framework import authentication

User = get_user_model()


class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        # 🔴 user number 4and 3 can't unlike or unlike posts of user number 2,3
        # it is auth problem.
        # maybe you need to login using google to solve that.
        qs = User.objects.filter(id=1)
        user = qs.order_by('?').first()
        return(user, None)
