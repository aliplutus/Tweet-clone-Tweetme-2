from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .form import PostForm
from .models import Tweet
from django.utils.http import is_safe_url
from django.conf import settings


def post_create_view(request, *args, **kwargs):
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    # try to understand ajax later
    print(request.is_ajax())
    form = PostForm(request.POST or None)
    # newUrl = request.POST.get('next') or None
    if form.errors:
        return JsonResponse(form.errors, status=400)
    if form.is_valid():
        # note the next:[''], and content:['] arguamenst
        # print('______________________ post Data:  ', request.POST)
        obj = form.save(commit=False)
        obj.user = user
        obj.save()
        nextUrl = request.POST.get('content')

        # create the JsonResponse after obj.save
        if request.is_ajax():
            # 201 for creating element
            return JsonResponse(obj.serialize(), status=201)

        if nextUrl and is_safe_url(nextUrl, settings.ALLOWED_HOSTS):
            return redirect('/to-a-not-a-real-page')
        form = PostForm()

    return render(request, 'pages/posting.html', context={"form": form})


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
