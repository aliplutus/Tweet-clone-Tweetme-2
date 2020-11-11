from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def home_view(request, *args, **kwards):
    return HttpResponse("<h1> Hello django </h1>")


def post_view(request, post_id, *args, **kwards):
    return HttpResponse(f"<h1> the post id is {post_id} </h1>")
