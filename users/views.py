from .models import CustomUser 
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .context import new_user
import json

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET', 'POST'])
def create_user(request):
    if request.method == 'POST':
        response, status = new_user(request)
    return Response(response, status=status)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = CustomUser.objects.get(username=request.user)
    serializer = UserSerializer(user)

    return Response(serializer.data)


@api_view(['GET', 'POST'])
def update_user(request, pk):
    user = CustomUser.objects.filter(id=int(pk))
    
    if request.method == 'POST':
        data = json.loads(request.body)
        new_username = data['username']
        new_email = data['email']
        user.update(username=new_username ,email=new_email)

    return Response(Response.status_code)
