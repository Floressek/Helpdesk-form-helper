# from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('api/', include('helpdesk.urls')),
    path('', TemplateView.as_view(template_name='index.html')), # For React app
]
