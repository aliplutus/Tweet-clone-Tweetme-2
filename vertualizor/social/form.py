from django import forms
from .models import Tweet


class PostForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ["content"]

    def clean_content(self):
        content = self.cleaned_data.get('content')
        if len(content) > 200:
            # when the text longer than 200 than we will have error 400 and than 400 will prevok this response.
            raise forms.ValidationError("This post is longer than 200")
        return content
