import React, { useState } from 'react';
import { PaymentElement, LinkAuthenticationElement, AddressElement} from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if (!stripe || !elements){
            return;
        }
        setIsProcessing(true)

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`,
            },
        })

        if(error.type === 'card_error' || error.type === 'validation_error'){
            setMessage(error.message)
        }else {
            setMessage("An unexpected error occured.")
        }

        setIsProcessing(false)
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <LinkAuthenticationElement />
            <AddressElement options={{mode: 'billing'}}/>
            <PaymentElement />
            <button type="submit" className="submit-btn" disabled={isProcessing || !stripe || !elements}>
                {isProcessing? "Processing ..." : "Pay now"}
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}

export default CheckoutForm;
