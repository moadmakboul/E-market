from django.db import models
from users.models import CustomUser

class Payment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    item = models.TextField()
    quantity = models.IntegerField(default=0)
