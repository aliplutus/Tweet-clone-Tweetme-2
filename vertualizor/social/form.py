from django import forms
from .models import Tweet


class PostForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ["content"]

    def clean_content(self):
        content = self.cleaned_data.get('content')
        if len(content) > 200:
            raise forms.ValidationError("This post is longer than 200")
        return content
