from shopBackend.settings import STRIPE_SECRET_KEY
from users.models import CustomUser
from cart.models import Cart
from products.models import Phone
from .models import Payment
from .serializers import PaymentSerializer
from cart.context import removeItems
import stripe

def handlePayment(request):
    stripe.api_key = STRIPE_SECRET_KEY
    
    user = CustomUser.objects.get(username=request.user)
    items_in_cart = Cart.objects.filter(user=user.id)
    
    amount = 0
    for item in items_in_cart:
        amount += int(Phone.objects.get(title=item.phone).price) * int(item.quantity)

    intent = stripe.PaymentIntent.create(
        amount=amount*100,
        currency='USD',
        payment_method_types=['card'],
        )
    
    return intent


def handleHistoryPayment(request, data):
    user = CustomUser.objects.get(username=request.user)
    removeItems(request)

    for item in data['items']:
        Payment.objects.create(user_id=user.id, item=item['title'], quantity=int(item['quantity']))
    
    purchases = Payment.objects.filter(user=user.id)
    serializer = PaymentSerializer(purchases, many=True)

    return serializer.data


def retrieveHistoryPayment(request):
    user = CustomUser.objects.get(username=request.user)

    history = Payment.objects.filter(user=user.id)

    serialize_history = PaymentSerializer(history, many=True)

    return serialize_history.data