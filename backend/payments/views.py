from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .context import handlePayment




# Create your views here.



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):
    payment = handlePayment(request)
    return Response(data=payment)