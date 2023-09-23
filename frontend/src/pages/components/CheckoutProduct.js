import React from 'react';
import Images from '../../images'


const CheckoutProduct = ({product}) => {
    return (
        <div className='checkout-product-box'>
            <div className='product-checkout-image'>
                <img src={Images[product.image]} alt="" />
            </div>
            <div className='product-checkout-info'>
                <h3>{product.title}</h3>
                <ul>
                    <li><span>Qty:</span> {product.quantity}</li>
                    <li><span>Brand:</span> {product.brand}</li>
                    <li><span>Unit Price:</span> ${product.price}</li>
                </ul>
            </div>
        </div>
    );
}

export default CheckoutProduct;
