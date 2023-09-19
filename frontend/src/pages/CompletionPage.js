import React, { useContext, useEffect } from 'react';
import '../styles/completionpage.css'
import { ShopContext } from '../context/ShopContext';
import { LoginContext } from '../context/LoginContext';

const CompletionPage = () => {
    const {cartedProducts, purchasedItems, getCart} = useContext(ShopContext)
    const {authTokens, user} = useContext(LoginContext)

    useEffect(()=>{
        if (user){
            getCart(authTokens)
        }
    }, [])
    
    useEffect(()=>{
        if (user && cartedProducts.length > 0){
            purchasedItems(authTokens, cartedProducts)
        }
    }, [cartedProducts.length])

    return (
        <div className='completion'>
            <h1>Thank you! 🎉</h1>
        </div>
    );
}

export default CompletionPage;
