from django.shortcuts import render
from .models import Profile
from django.http import Http404


def profile_detail_view(request, username, *args, **kwargs):
    # get the profile for the passed username
    qs = Profile.objects.filter(user__username=username)

    # if not qs.exists():
    #     raise Http404
    # 🔴 do later rais Http404 error when not exist.
    # debug
    # from this point you need to review commit from 82 to 86.
    # print({'qs should be true': qs.exists()})
    # print({'qs should return some value': qs})
    # print({'profile_obj': profile_obj})
    # print({"username": username})

    return render(request, "profiles/detail.html", {'username': username, "profile": qs.first()})
