from django.contrib import admin
from .models import Phone, PhoneDetails, ProductCategory

# Register your models here.
admin.site.register(Phone)
admin.site.register(PhoneDetails)
admin.site.register(ProductCategory)
