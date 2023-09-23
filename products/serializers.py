from rest_framework.serializers import ModelSerializer
from .models import Phone, PhoneDetails


class PhoneSerializer(ModelSerializer):
    class Meta:
        model = Phone
        fields = '__all__'


class PhoneDetailsSerializer(ModelSerializer):
    class Meta:
        model = PhoneDetails
        fields = ['product', 'brand', 'name', 'cellular_technology', 'memory_storage_capacity', 'screen_size', 'about']