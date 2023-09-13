import React from 'react';
import images from '../../images'
import {BsTrash} from 'react-icons/bs'

const CartProduct = ({product, removeItemFromCart, authTokens, putItemInCart}) => {
    
    const updateQuantity = (status) => {
        let newQuantity = 0

        if (status === 'add'){
            newQuantity = Number(product.quantity) + 1
            putItemInCart(product.id, authTokens, newQuantity)
        }else if (status === 'substract'){
            newQuantity = Number(product.quantity) - 1
            if (newQuantity > 0){
                putItemInCart(product.id, authTokens, newQuantity)
            }else if (newQuantity === 0){
                removeItemFromCart(authTokens, product.id)
            }
        }

    }

    return (
        <div className='cart-product'>
            <div className="image-cart-product" >
                <img src={images[product.image]} alt="" />
            </div>
            <h2>{product.title}</h2>
            <div className="details-cart-product">
                <p className='price-product-cart'>${product.price}</p>
                <div className='quantity-product'>
                    <div>
                        <p onClick={()=>updateQuantity('add')}><i className="arrow up"></i></p>
                        <p onClick={()=>updateQuantity('substract')}><i className="arrow down"></i></p>
                    </div>
                    <p className="quantity-display">{product.quantity}</p>
                </div>
                <BsTrash size={15} className='trash' onClick={() => removeItemFromCart(authTokens, product.id)} />
            </div>
        </div>
    );
}

export default CartProduct;
