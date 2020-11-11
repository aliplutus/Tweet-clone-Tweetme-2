from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# Create your views here.
from .models import Tweet


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
