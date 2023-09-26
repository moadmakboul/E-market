import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {BsBoxSeam} from 'react-icons/bs'
import {BiCheckShield} from 'react-icons/bi'
import {PiWarningCircleBold} from 'react-icons/pi'
import { ToastContainer, toast } from 'react-toastify';
import Images from '../../images';
import { ShopContext } from '../context/ShopContext';
import { LoginContext } from '../context/LoginContext';
import '../../styles/descriptivepage.css'


const ItemDescription = () => {
    const {product, getFullDescription, putItemInCart, getCart} = useContext(ShopContext)
    const {authTokens} = useContext(LoginContext)
    const [isadded, setIsAdded] = useState(null)
    const { id } = useParams();

    let currentTime = new Date();
    let futureTime = currentTime.setDate(currentTime.getDate() + 3)
    let deliveryDate = new Date(futureTime).toDateString()

    useEffect(()=>{
        getFullDescription(id)
        getCart(authTokens)
        if(isadded){
            setIsAdded(false)
        }
    }, [authTokens, isadded, id])

    const addItem = () => {
        if (authTokens){
            putItemInCart(product.id, authTokens)
            toast('Product has been added successfully')
            setIsAdded(true)
        }else {
            toast('Please Login first!')
        }
    }

    return (
        <div>
            {product.length !==0 && 
                <>

                    <div className='overview'>
                        <div className='product-image-description'>
                            <img src={Images[product.image]} alt="" />
                        </div>
                        <div className='product-information'>
                            <h1>{product.details.name}</h1>
                            <h2>${product.price}</h2>
                            <h3>Order now and get it around {deliveryDate}</h3>
                            <div className='extra-information'>
                                <div>
                                    <BsBoxSeam size={25} className='icons-info' />
                                    <p><span className='titles-parag'>Availability :</span> In stock</p>
                                </div>
                                <div>
                                    <BiCheckShield size={25} className='icons-info' />
                                    <p><span className='titles-parag'>Warranty:</span> 1 year starts from the date of receipt</p>
                                </div>
                                <div>
                                    <PiWarningCircleBold size={25} className='icons-info' />
                                    <p><span className='titles-parag'>Note:</span> Electronic products sold in US store operate on (110-120) volts, a step-down power converter is required for the smooth device function. It is mandatory to know the wattage of the device in order to choose the appropriate power converter.</p>
                                </div>
                            </div>
                            <button onClick={()=>addItem()}>ADD TO CART</button>
                        </div>
                    </div>
                    <div className='description'>
                        <table className='descriptive-table'>
                            <tbody>
                                {Object.entries(product.details).map(([key, value])=>(
                                    key !== 'about' && (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{value}</td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                        <p className='add-information'>{product.details.about}</p>
                    </div>
                </>
            }
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

export default ItemDescription;
