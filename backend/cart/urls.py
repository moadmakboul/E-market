from django.urls import path
from . import views

urlpatterns = [
    path('', views.getProducts, name='items in cart'),
    path('add/', views.putProducts, name='add_item'),
    path('remove/<str:id>', views.removeProduct, name='remove_item'),
    path('remove_all/', views.removeAll, name='remove_all'),
]