import React, {useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import {VscAccount} from 'react-icons/vsc'
import {BsCart} from 'react-icons/bs'
import Logo from '../assets/logo-navbar.png'
import '../styles/navbar.css'
import Dropdown from './Dropdown';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const {user, logout} = useContext(LoginContext)
    const {cartCountItem} = useContext(ShopContext)

    return (
        <div>
            <nav className="nav-bar">
                <div className='logo'>
                    <img src={Logo} alt="" />
                </div>
                <ul className="nav-list">
                    <li><a href="/">Home</a></li>
                    <li id='cart'><a href="/cart"><span id='cart-count' style={{backgroundColor: cartCountItem > 0 && 'red'}}>{cartCountItem !== null ? cartCountItem: 0}</span><BsCart  /> Cart</a></li>
                    <li className='account-tab'>
                        <VscAccount size={20} id='icon-account' />{user? user.username:'Account'} <i className="arrow down"></i>
                        <Dropdown user={user} logout={logout}/>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
