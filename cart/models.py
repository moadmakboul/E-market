from django.db import models
from users.models import CustomUser
from products.models import Phone

class Cart(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    phone = models.ForeignKey(Phone, on_delete=models.CASCADE, null=True)
    quantity = models.IntegerField(null=True)