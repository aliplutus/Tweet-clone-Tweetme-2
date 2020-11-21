from django.contrib import admin
from django.urls import path, include
from .views import (home_view,
                    post_view,
                    posts_list_view,
                    post_create_view,
                    post_delete_view,
                    post_actions_view)

urlpatterns = [
    path('<int:postId>/', post_view),  # dyanmic url
    path('<int:postId>/delete/', post_delete_view),
    path('', posts_list_view),
    path('actions/', post_actions_view),
    path('create/', post_create_view),
    path('accounts/', include('allauth.urls')),
]
