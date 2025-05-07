from django.db import models
from django.core.validators import MaxLengthValidator, MinLengthValidator, MaxValueValidator, MinValueValidator

class HelpdeskForm(models.Model):
    """
    Main class for the Helpdesk form.
    """
    first_name = models.CharField(
        max_length=30,
        validators=[MaxLengthValidator(30)]
    )
    last_name = models.CharField(
        max_length=20,
        validators=[MaxLengthValidator(20)]
    )
    email = models.EmailField()
    reason_of_contact = models.TextField(validators=[MaxLengthValidator(100)])
    urgency = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    created_at = models.DateTimeField(auto_now_add=True)

    # Optional fields
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.reason_of_contact}"