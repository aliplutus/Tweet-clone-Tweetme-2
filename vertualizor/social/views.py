from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .form import PostForm
from .models import Tweet
from django.utils.http import is_safe_url
from django.conf import settings
from .serializers import TweeSerializers


def post_create_view(request, *args, **kwargs):
    serializer = TweeSerializers(data=request.POST or None)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return JsonResponse(serializer.data, status=201)
    return JsonResponse({}, status=400)


def home_view(request, *args, **kwards):
    return render(request, 'pages/home.html', context={}, status=200)


def post_view(request, post_id, *args, **kwards):
    try:
        obj = Tweet.objects.get(id=post_id)
        data = {
            'id': post_id,
            'content': obj.content,
            # 'image_bath': obj.image.url  # we will use this later
        }
        status = 200
    except:
        data = {
            'error': '404',
            'content': 'no such post',
            # 'image_bath': obj.image.url  # we will use this later
        }
        status = 404
    return JsonResponse(data, status=status)


def posts_list_view(request, *args, **kwards):
    allposts = Tweet.objects.all()
    posts_list = [x.serialize() for x in allposts]
    data = {'response': posts_list}
    return JsonResponse(data)
