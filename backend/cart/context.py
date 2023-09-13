from .models import Cart
from users.models import CustomUser
from products.models import Phone
from .serializers import CartSerializer
from products.serializers import PhoneSerializer


def handleCart(request):
    products = []
    user = CustomUser.objects.get(username=request.user)
    items_in_cart = Cart.objects.filter(user=user.id)

    serialize_cart = CartSerializer(items_in_cart, many=True).data

    for item in serialize_cart:
        products.append(Phone.objects.get(id=item['phone']))

    serialize_phone = PhoneSerializer(products, many=True).data

    for phone in serialize_phone:
        for item in serialize_cart:
            if phone['id'] == item['phone']:
                phone['quantity'] = item['quantity']
            
            
    return serialize_phone


def removeItem(request, id):
    user = CustomUser.objects.get(username=request.user)
    Cart.objects.filter(user=user.id).get(phone_id=id).delete()
    items = Cart.objects.filter(user=user.id)
    items_serialized = CartSerializer(items, many=True).data
    return items_serialized


def additem(data, request):
    user = CustomUser.objects.get(username=request.user)
    phone_id = data['phone_id']
    quantity = data['quantity']
    

    item = Cart.objects.filter(user=user.id, phone_id=phone_id).exists()

    if item:
        Cart.objects.filter(user=user.id, phone_id=phone_id).update(quantity=quantity)
    else:
        item = Cart.objects.create(user_id=user.id, phone_id=phone_id, quantity=quantity)
        item.save()

    query_cart = Cart.objects.filter(user=user.id)
    serialize_query = CartSerializer(query_cart, many=True).data

    return serialize_query


def removeItems(request):
    user = CustomUser.objects.get(username=request.user)
    Cart.objects.filter(user=user.id).delete()
    