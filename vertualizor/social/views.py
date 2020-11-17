from django.shortcuts import render, redirect
from .models import Tweet
from django.utils.http import is_safe_url
from .serializers import TweeSerializers
from rest_framework.response import Response
from rest_framework.decorators import api_view


# this woll make POST request work and re-render the new posts.
@api_view(["POST"])
def post_create_view(request, *args, **kwargs):
    serializer = TweeSerializers(data=request.POST or None)
    # raise_exception= if form.error reutnr error and status400
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


def home_view(request, *args, **kwards):
    return render(request, 'pages/home.html', context={}, status=200)


@api_view(["GET"])
def post_view(request, postId, *args, **kwards):
    qs = Tweet.objects.filter(id=postId)
    if not qs.exists():
        return Response({}, status=404)
    return Response(TweeSerializers(qs.first()).data, status=200)


@api_view(["GET"])
def posts_list_view(request, *args, **kwards):
    qs = Tweet.objects.all()
    serializer = TweeSerializers(qs, many=True)
    return Response(serializer.data)
