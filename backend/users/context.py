from rest_framework import status
from .models import CustomUser
import json

def new_user(request):
    data = json.loads(request.body)
    username = data['username']
    email = data['email']
    password = data['password']
    
    username_exists = CustomUser.objects.filter(username=username).exists()
    email_exists = CustomUser.objects.filter(email=email).exists()
    
    if username_exists or email_exists:
        return {
            'username_exists': username_exists,
            'email_exists': email_exists
        }, status.HTTP_400_BAD_REQUEST
    else:
        new_user = CustomUser.objects.create_user(username=username, email=email, password=password)
        new_user.save()
        return {}, status.HTTP_200_OK