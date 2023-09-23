from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .context import handleCart, removeItem, additem, removeItems
import json


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProducts(request):
    phones = handleCart(request)
    return Response(phones)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def putProducts(request):

    if request.method == 'POST':
        data = json.loads(request.body)
        items = additem(data, request)
        

    return Response(items)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def removeProduct(request, id):
    items = removeItem(request, id)
    return Response(items)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def removeAll(request):
    removeItems(request)
    return Response(Response.status_code)