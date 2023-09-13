import React, { useContext, useEffect } from 'react';
import '../styles/checkoutpage.css'
import { Elements } from "@stripe/react-stripe-js";
import CheckoutProduct from './components/CheckoutProduct';
import CheckoutForm from './components/CheckoutForm';
import { PaymentContext } from '../context/PaymentContext';
import { ShopContext } from '../context/ShopContext';
import { LoginContext } from '../context/LoginContext';

const CheckoutPage = () => {
    let {stripePromise, clientSecret, paymentHandler} = useContext(PaymentContext)
    let {authTokens} = useContext(LoginContext)
    let {cartedProducts, cartTotalPrice, getCart} = useContext(ShopContext)

    useEffect(()=>{
        getCart(authTokens)
        paymentHandler(authTokens)
    }, [])
    
    return (
        <div className='checkout'>
            <div className='receipt'>
                <div className='checkout-products'>
                    {cartedProducts&& cartedProducts.map(product => (
                        <CheckoutProduct product={product} />
                    ))}
                </div>
                <div>
                    <h3>Grand Total <span>${cartTotalPrice? cartTotalPrice: "0"}</span></h3>
                </div>
            </div>
            <div className='payment-section'>
                {clientSecret && (
                    <Elements stripe={stripePromise} options={{clientSecret}} >
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </div>
    );
}

export default CheckoutPage;
