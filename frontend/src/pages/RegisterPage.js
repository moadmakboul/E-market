import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../styles/registerpage.css'
import { LoginContext } from '../context/LoginContext';


const RegisterPage = () => {
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    const {isValidUsername, isValidEmail, createUser} = useContext(LoginContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        createUser(username, email, password)
    }


    return (
        <div id='register_section'>
            <form onSubmit={handleSubmit}>
                {!isValidUsername && <p style={{color: 'red'}}>Already used username!</p>}
                <input type="text" name="username" id="username" placeholder='Username' onChange={(e)=>setUsername(e.target.value)} required/>
                {!isValidEmail && <p style={{color: 'red'}}>Already used Email!</p>}
                <input type="email" name="email" id="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} required/>
                <input type="password" name="password" id="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} required />
                {password !== null && confirmPassword!== null && password !== confirmPassword && <p style={{color: 'red'}}>Passwords do not match!</p> }
                <input type="password" name="confirm_password" id="confirm_password" placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                <input type="submit" id='create_profile' value="Create Profile" />
            </form>
        </div>
    );
}

export default RegisterPage;
