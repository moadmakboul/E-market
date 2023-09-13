from shopBackend.settings import STRIPE_SECRET_KEY
from users.models import CustomUser
from cart.models import Cart
from products.models import Phone
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
