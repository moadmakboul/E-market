import React from 'react';
import '../styles/navbar.css'
import {BiLogIn} from 'react-icons/bi'
import {IoCreateOutline} from 'react-icons/io5'
import {BiLogOut} from 'react-icons/bi'
import {ImProfile} from 'react-icons/im'


const Dropdown = ({user, logout}) => {
    
    return (
        <div className='dropdown'>
            <ul>
                {user ? (
                    <>
                        <li onClick={logout}><BiLogOut /> Logout</li>
                        <li><a href='/profile'><ImProfile /> Profile</a></li>
                    </>
                ):
                <>
                    <li><a href="/login"><BiLogIn /> Login</a></li>
                    <li><a href="/register"><IoCreateOutline /> New user?</a></li>
                </>
            }

            </ul>
        </div>
    );
}

export default Dropdown;
