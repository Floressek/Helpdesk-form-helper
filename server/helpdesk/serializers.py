from rest_framework import serializers
from .models import HelpdeskForm

class HelpdeskFormSerializer(serializers.ModelSerializer):
    """
    Serializer for the HelpdeskForm model.
    """
    class Meta:
        model = HelpdeskForm
        fields = ['first_name', 'last_name', 'email', 'reason_of_contact', 'urgency']