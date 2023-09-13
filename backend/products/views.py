from rest_framework.response import Response
from rest_framework.decorators import api_view
from .context import HandleData

@api_view(['GET'])
def getPhones(request):
    data = HandleData()
    phones = data.dataToDisplay()
    return Response(phones)


@api_view(['GET'])
def getPhone(request, pk):
    data = HandleData()
    phones = data.dataToDisplay()
    
    if int(pk) <= len(phones):
        for phone in phones:
            if phone['id'] == int(pk):
                data = phone
    else:
        data = []

    return Response(data)