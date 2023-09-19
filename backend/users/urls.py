from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('create_user/', views.create_user, name='create_user'),
    path('get_user/', views.get_user, name='get_user'),
    path('update_user/<str:pk>', views.update_user, name='update_user'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]