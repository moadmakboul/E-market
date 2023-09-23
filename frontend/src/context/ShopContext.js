import { createContext, useState } from "react";


export const ShopContext = createContext(null)


export const ShopContextProvider = ({children}) => {

    const [products, setProducts] = useState([])
    const [cartedProducts, setCartedProducts] = useState([])
    const [cartCountItem, setCartCountItem] = useState(null)
    const [cartIsUpdated, setCartIsUpdated] = useState(false)
    const [cartTotalPrice, setCartTotalPrice] = useState(0)
    const [product, setProduct] = useState([])
    const [loading , setLoading] = useState(true)
    const [history, setHistory] = useState([])

    // Display all products in inventory
    const productsToDisplay = async () => {
        let response = await fetch('http://127.0.0.1:8000/phone/phones/')
        let data = await response.json()

        if (response.status === 200){
            setProducts(data)
        }

        if (loading){
            setLoading(false)
        }
    }

    // Display products in cart
    const getCart = async (authTokens) => {
        let response = await fetch('http://127.0.0.1:8000/get_cart/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + String(authTokens?.access)
            },
            })

        let data = await response.json()

        if(response.status === 200){

            setCartedProducts(data)
            dataToDisplay(data)
            calculatePrice(data)
            
            if(cartIsUpdated){
                setCartIsUpdated(false)
            }
        
            if (loading){
                setLoading(false)
            }

    }}

    // Add product to cart or update quantity
    let putItemInCart = async(phone_id, authTokens, quantity=1) =>{
        let response = await fetch('http://127.0.0.1:8000/get_cart/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer ' + String(authTokens?.access)
                },
                body: JSON.stringify({
                    'phone_id': phone_id,
                    'quantity': quantity
                })
            })

            if (response.status === 200){
                setCartIsUpdated(true)
                return console.log('product has been added successfully');
            }
    }

    // Remove product from cart
    let removeItemFromCart = async(authTokens, id) => {
        let response = await fetch(`http://127.0.0.1:8000/get_cart/remove/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer ' + String(authTokens?.access)
                }
            })
            
            if (response.status === 200){
                setCartIsUpdated(true)
                return console.log('product has been deleted successfully');
            }
    }

    // Get all information about product
    let getFullDescription = async(id) => {
        let response = await fetch(`http://127.0.0.1:8000/phone/phone/${id}`)
        let data = await response.json()

        if (response.status === 200){
            setProduct(data)
        }
    }

    let purchasedItems = async (authTokens, data) => {
        let response = await fetch('http://127.0.0.1:8000/payments/history_payment/', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer ' + String(authTokens?.access)
                },
                body: JSON.stringify({
                    'items' : data
                })
        })
        
        if (response.status === 200){
            console.log('okay!');
        }
    }

    let historyPurchases = async (authTokens) => {
        let response = await fetch('http://127.0.0.1:8000/payments/get_history_payment', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + String(authTokens?.access)
            }
        })

        let data = await response.json()

        if (response.status === 200){
            setHistory(data)
        }
    }
    // handling Data Fetched

    const dataToDisplay = (data) => {
        let cart_ids = []
            data.map(item =>(
                cart_ids.push(item.id)
            ))

            setCartCountItem(cart_ids.length)

            setProducts(prev =>(
                prev.map(product => (
                    cart_ids.includes(product.id) ? {...product, is_carted:true} : {...product, is_carted:false}
                ))
            ))
    }

    const calculatePrice = (data) => {
        let totalPrice = 0
        data.map(item =>(
            totalPrice += Number(item.quantity) * Number(item.price)
        ))
        setCartTotalPrice(totalPrice)
    }

    const contextValue = {
        products: products,
        product: product,
        cartedProducts: cartedProducts,
        cartCountItem: cartCountItem,
        cartIsUpdated: cartIsUpdated,
        cartTotalPrice: cartTotalPrice,
        history: history,
        productsToDisplay: productsToDisplay,
        getCart: getCart,
        putItemInCart: putItemInCart,
        removeItemFromCart: removeItemFromCart,
        getFullDescription: getFullDescription,
        purchasedItems: purchasedItems,
        historyPurchases: historyPurchases,
    }

    return(
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}