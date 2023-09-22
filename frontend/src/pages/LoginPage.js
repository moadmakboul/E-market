import React, { useContext } from 'react';
import '../styles/loginpage.css'
import { LoginContext } from '../context/LoginContext';

const LoginPage = () => {
    const {login} = useContext(LoginContext)
    return (
        <div className='signin'>
            <div className='inputs'>
                <h3>Welcome to E-Market</h3>
                <form onSubmit={login}>
                    <input type="text" name="username" id="username"  placeholder='Username' required/>
                    <input type="password" name="password" id="password" placeholder='Password' required/>
                    <input type="submit" value="SIGN IN" id='submit'/>
                </form>
                <div className='footer-sign'>
                    <a href='/'>Forgot password?</a>
                </div>
            </div>
            <div className='create-section'>
                <h3>New to E-Market</h3>
                <button><a href='/register'>Create an Account</a></button>
                <ul>
                    <li>Delivering in All Africa</li>
                    <li>10 Million Happy Customers</li>
                    <li>10 years of presence in market</li>
                </ul>
            </div>
        </div>
    );
}

export default LoginPage;
