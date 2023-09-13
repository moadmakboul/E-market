from .models import Phone, PhoneDetails
from .serializers import PhoneSerializer, PhoneDetailsSerializer
from cart.models import Cart

class HandleData:

    def dataToDisplay(self):
        queryPhones = Phone.objects.all()
        queryDetails = PhoneDetails.objects.all()
        phone_serializer = PhoneSerializer(queryPhones, many=True)
        details_serializer = PhoneDetailsSerializer(queryDetails, many=True)

        phones = phone_serializer.data
        details = details_serializer.data


        for phone in phones:
            phone['is_carted'] = False
            phone['details'] = {}
            for item in details:
                if item['product'] == phone['id']:
                    phone['details']['about'] = item['about']
                    phone['details']['barnd'] = item['brand']
                    phone['details']['cellular technology'] = item['cellular_technology']
                    phone['details']['memory storage capacity'] = item['memory_storage_capacity']
                    phone['details']['name'] = item['name']
                    phone['details']['screen size'] = item['screen_size']

        return phones