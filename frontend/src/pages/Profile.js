import React, { useContext, useEffect } from 'react';
import moment from 'moment'
import '../styles/profilepage.css'
import { ShopContext } from '../context/ShopContext';
import { LoginContext } from '../context/LoginContext';

const Profile = () => {
    const {authTokens, userData, getUserData} = useContext(LoginContext)
    const {history, historyPurchases} = useContext(ShopContext)
    
    useEffect(()=>{
        if(authTokens){
            historyPurchases(authTokens)
            getUserData(authTokens)
        }
    }, [authTokens])
    
    return (
        <div id='profile'>
            {userData.length !== 0 && (
                <div id='personal-data'>
                    <h1>Personal Information</h1>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>Profile created since {moment(userData.date_joined).format('YYYY/MM')}</p>
                </div>
            )}
            <div id='history'>
                <h1>History of purchases</h1>
                {history.length !== 0? (
                    history.map(item => (
                        <div className='items' key={item.id}>
                            <p>{item.item}, Pcs: {item.quantity}</p>
                        </div>
                    ))
                ): (<p id='empty-history'>No purchases made so far!</p>)}
            </div>
        </div>
    );
}

export default Profile;
