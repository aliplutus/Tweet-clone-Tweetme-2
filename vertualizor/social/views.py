from django.shortcuts import render, redirect
from .models import Tweet
from django.utils.http import is_safe_url
from .serializers import CreateTweeSerializers, TweeSerializers, TweetActionsSerlizer
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
# this woll make POST request work and re-render the new posts.
import json


@api_view(["POST"])
# @authentication_classes([SessionAuthentication,MyCustomAuth])
@permission_classes([IsAuthenticated])
def post_create_view(request, *args, **kwargs):
    serializer = CreateTweeSerializers(data=json.loads(request.body))
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


@api_view(["DELETE", 'POST'])
@permission_classes([IsAuthenticated])
def post_delete_view(request, postId, *args, **kwards):
    qs = Tweet.objects.filter(id=postId)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message": 'you cant delete this Post'}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({'Message': "post removed"}, status=200)


@api_view(["GET"])
def posts_list_view(request, *args, **kwards):
    # this authenticate withut google.
    # later convert it to google auth.
    qs = Tweet.objects.all()
    username = request.GET.get('username')
    print(username)
    if username != None:
        qs = qs.filter(user__username__iexact=username)
    serializer = TweeSerializers(qs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_actions_view(request, *args, **kwards):
    '''
    actions = like,unlike,retweet
    '''
    # i dont understand how request.POST will send the id and the action type to the serlizer?
    # data=request.POST was a mistake
    passedData = json.loads(request.body)
    serlizer = TweetActionsSerlizer(data=passedData)
    if serlizer.is_valid(raise_exception=True):
        data = serlizer.validated_data
        post_id = data.get('id')
        action = data.get('action')
        # you must serlize data to the get them.
        content = data.get('content')
    qs = Tweet.objects.filter(id=post_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TweeSerializers(qs, many=True)
    if action == 'like':
        if request.user in obj.like.all():
            obj.like.remove(request.user)
        else:
            obj.like.add(request.user)

        return Response(serializer.data, status=200)
    elif action == 'retweet':
        newTwee = Tweet.objects.create(
            user=request.user, parent=obj, content=content)
        serlizer = TweeSerializers(newTwee)
        return Response(serlizer.data, status=201)

    return Response({}, status=200)
