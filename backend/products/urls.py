from django.urls import path
from . import views

urlpatterns = [
    path('phones/', views.getPhones, name='phones'),
    path('phone/<str:pk>', views.getPhone, name='phone'),
]