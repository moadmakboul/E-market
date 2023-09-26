import { createContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";


export const PaymentContext = createContext(null)

export const PaymentContextProvider = ({children}) => {
    let key = 'pk_test_51Npr72GE6sW7hsPsETmWOiwsRi5DuNKgCFx2V9X20VIWkFuZpidsJqeelR1mD4JTK4n5nnOvv4PKiYASL92J2eln00kJryH0Ur'
    let stripePromise = loadStripe(key)

    const [clientSecret, setClientSecret] = useState('')

    const paymentHandler = async(authTokens) => {
        let response = await fetch('https://e-market-z2s5.onrender.com/payments/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + String(authTokens?.access)
            }})
        let {client_secret} = await response.json()

        if(response.status === 200){
            setClientSecret(client_secret)
        }
    }
 
    const contextValue = {
        stripePromise: stripePromise,
        clientSecret: clientSecret,
        paymentHandler: paymentHandler,
    }

    return(
        <PaymentContext.Provider value={contextValue}>
            {children}
        </PaymentContext.Provider>
    )
}