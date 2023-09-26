import React, { useContext, useEffect } from 'react';
import '../styles/completionpage.css'
import { ShopContext } from '../context/ShopContext';
import { LoginContext } from '../context/LoginContext';

const CompletionPage = () => {
    const {cartedProducts, purchasedItems, getCart} = useContext(ShopContext)
    const {authTokens} = useContext(LoginContext)

    useEffect(()=>{
        if (authTokens){
            getCart(authTokens)
        }
    }, [authTokens])
    
    useEffect(()=>{
        let mounted = true
        if (authTokens && cartedProducts.length > 0){
            if (mounted){
                purchasedItems(authTokens, cartedProducts)
            }
        }
        return () => mounted = false
        
    }, [authTokens, cartedProducts.length])

    return (
        <div className='completion'>
            <h1>Thank you! 🎉</h1>
        </div>
    );
}

export default CompletionPage;
