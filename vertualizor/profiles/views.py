from django.shortcuts import render, redirect
from .models import Profile
from django.http import Http404
from .forms import ProfileForm


def profile_update_view(request, *args, **kwargs):
    if not request.user.is_authenticated:  # is_authenticated()
        return redirect("/login?next=/profile/update")
    user = request.user
    user_data = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email
    }
    my_profile = user.profile
    form = ProfileForm(request.POST or None,
                       instance=my_profile, initial=user_data)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        email = form.cleaned_data.get('email')
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
        profile_obj.save()
    context = {
        "form": form,
        "btn_label": "Save",
        "title": "Update Profile"
    }
    return render(request, "profiles/forms.html", context)


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
