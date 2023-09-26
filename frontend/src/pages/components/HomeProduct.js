import React from 'react';
import '../../styles/homeproduct.css'
import {BsCartPlus} from 'react-icons/bs'
import {BsFillCartCheckFill} from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Images from '../../images'

const HomeProduct = ({product, putItemInCart, authTokens, setStatus, removeItemFromCart}) => {
   
    let handleClick = (params) => {
        if (authTokens){
            if (params === 'add'){
                putItemInCart(product.id, authTokens)
                setStatus(true)
                toast('Product has been added successfully')
            }
            if (params === 'remove'){
                removeItemFromCart(authTokens, product.id)
                setStatus(true)
                toast('Product has been removed successfully')
            }
        }else {
            toast('Please Login first!')
        }
    }

    return (
        <div className='product-box'>
            <div className='product-image'>
            <a href={"/product/"+ product.id.toString()}><img src={Images[product.image]} alt="" /></a>
            </div>
            <div className='product-details'>
                <div className='information'>
                    <a href={"/product/"+ product.id}><h2>{product.title}</h2></a>
                </div>
                <div className='cart-button'>
                    <h3>${product.price}</h3>
                    {product.is_carted?
                    <BsFillCartCheckFill 
                    className='cart-icon-product' 
                    onClick={()=>handleClick('remove')} 
                    size={30}/>:
                    <BsCartPlus 
                    className='cart-icon-product' 
                    onClick={()=>handleClick('add')} 
                    size={30} />}
                </div>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default HomeProduct;
