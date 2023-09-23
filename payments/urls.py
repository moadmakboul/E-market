from django.urls import path
from . import views

urlpatterns =[
    path('', views.getOrders, name='get_orders'),
    path('history_payment/', views.stockOrders, name='stock_orders'),
    path('get_history_payment', views.getHistory, name='retrieve_history')
]