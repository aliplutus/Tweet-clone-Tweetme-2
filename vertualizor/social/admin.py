from .models import Tweet, PostLike
from django.contrib import admin

# Register your models here.


class PostLike(admin.TabularInline):
    model = PostLike


class PostsAdmin(admin.ModelAdmin):
    inlines = [PostLike]
    # where to search.
    search_fields = ['content', "user__username", "user__email"]
    # this to dispaly USER Content
    # "__str__" dysplay object(id) by defualt
    list_display = ["__str__", 'user', 'content']

    class Meta:
        model = Tweet


admin.site.register(Tweet, PostsAdmin)
