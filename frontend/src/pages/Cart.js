import React, {useContext, useEffect} from 'react';
import { ShopContext } from '../context/ShopContext';
import { LoginContext } from '../context/LoginContext';
import {BsCart4} from 'react-icons/bs'
import CartProduct from './components/CartProduct';
import '../styles/cartpage.css'

const Cart = () => {
    const {cartedProducts, 
        getCart, 
        cartIsUpdated,
        cartTotalPrice, 
        removeItemFromCart, 
        putItemInCart
    } = useContext(ShopContext)

    const {authTokens, user} = useContext(LoginContext)

    useEffect(()=>{
      if (authTokens){
          getCart(authTokens)
      }
    }, [cartedProducts.length, cartIsUpdated])
    
    return (
        <div className='cart'>
            {cartedProducts.length !== 0? (
                <>
                    <div className='products'>
                        {cartedProducts.map((product)=>(
                        <CartProduct 
                        key={product.id} 
                        product={product} 
                        removeItemFromCart={removeItemFromCart} 
                        authTokens={authTokens}
                        putItemInCart={putItemInCart}
                        />))}
                    </div>
                    <div className='pricelist-section'>
                        <h2>Order Summary</h2>
                        <h3>Total: <span>${cartTotalPrice}</span></h3>
                        <p>Services included:</p>
                        <li>free shipping</li>
                        <button><a href="/checkout">Checkout</a></button>
                    </div>
                </>

            ): (
                <div className='empty-cart'>
                    <div className='cart-icon-empty'>
                        <BsCart4 size={200} />
                    </div>
                    <div>
                        <h1>The cart is Empty! fill in it soon</h1>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
