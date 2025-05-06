from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HelpdeskFormViewSet, chat_with_ai, get_initial_ai_message

router = DefaultRouter()
router.register(r'forms', HelpdeskFormViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('chat/', chat_with_ai, name='chat_with_ai'),
    path('initial-message/', get_initial_ai_message, name='get_initial_ai_message'),
]