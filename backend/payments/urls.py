from django.urls import path
from . import views

urlpatterns =[
    path('', views.getOrders, name='get_orders')
]