from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# Create your views here.
from .models import Tweet


def home_view(request, *args, **kwards):
    return HttpResponse("<h1> Hello django </h1>")


def post_view(request, post_id, *args, **kwards):
    obj = Tweet.objects.get(id=post_id)
    data = {
        'id': post_id,
        'content': obj.content,
        # 'image_bath': obj.image.url #we will use this later
    }
    # HttpResponse(f"<h1> the post id is {post_id}, {obj.content} </h1>")
    return JsonResponse(data)
