from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import HelpdeskForm
from .serializers import HelpdeskFormSerializer
from .services import process_user_message, get_initial_message


class HelpdeskFormViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows helpdesk forms to be viewed or edited.
    """
    queryset = HelpdeskForm.objects.all()
    serializer_class = HelpdeskFormSerializer


@api_view(['POST'])
def chat_with_ai(request):
    """
    Endpoint to chat with the AI for helpdesk form assistance.
    """
    user_message = request.data.get('message')
    if not user_message:
        return Response({"error": "Message is required."}, status=status.HTTP_400_BAD_REQUEST)
    current_form_data = request.data.get('form_data', {})
    if not current_form_data:
        return Response({"error": "Form data is required."}, status=status.HTTP_400_BAD_REQUEST)
    chat_history = request.data.get('chat_history', [])
    try:
        # Process the user message and get the AI response
        ai_response = process_user_message(user_message, current_form_data, chat_history)
        return Response(ai_response, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "error": str(e),
            "type": type(e).__name__
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_initial_ai_message(request):
    """
    Endpoint to get the initial message for the helpdesk form.
    """
    try:
        initial_message = get_initial_message()
        return Response({"message": initial_message}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
