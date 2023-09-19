from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
import json
from .context import handlePayment, handleHistoryPayment, retrieveHistoryPayment


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):
    payment = handlePayment(request)
    return Response(data=payment)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def stockOrders(request):

    if request.method == 'POST':
        data = json.loads(request.body)
        purchases = handleHistoryPayment(request, data)

    return Response(purchases)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getHistory(request):
    print(request.user)
    history = retrieveHistoryPayment(request)
    return Response(history)