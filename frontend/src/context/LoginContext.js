import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'


export const LoginContext = createContext(null)

export const LoginContextProvider = ({children}) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState([])
    const [loading , setLoading] = useState(true)
    const [isValidUsername, setIsValidUsername] = useState(true)
    const [isValidEmail, setIsvalidEmail] = useState(true)
    const navigate = useNavigate()

    const login = async(e) => {
        e.preventDefault()

        let response = await fetch('https://e-market-z2s5.onrender.com/users/api/token/',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                {
                    'username': e.target.username.value,
                    'password': e.target.password.value
                }
            )
        })

        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            localStorage.setItem('authTokens', JSON.stringify(data))
            setUser(jwtDecode(data.access))
            navigate('/')

        }else {
            return console.error('something went wrong');
        }
    }

    const logout = () => {
        setAuthTokens(null)
        localStorage.removeItem('authTokens')
        setUser(null)
        navigate('/login')
    }

    const getUserData = async (authTokens) => {
        let response = await fetch('https://e-market-z2s5.onrender.com/users/get_user/', {
            method : 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + String(authTokens?.access)
            }, 
        })

        let data = await response.json()

        if (response.status === 200) {
            setUserData(data)
        }
    }

    const createUser = async (username, email, password) => {
        setIsValidUsername(true)
        setIsvalidEmail(true)

        let response = await fetch('https://e-market-z2s5.onrender.com/users/create_user/', {
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                {
                    'username': username,
                    'email': email,
                    'password': password
                }
            )
        })

        let data = await response.json()
        
        if (response.status === 200){
            navigate('/login')
        }
        if (response.status === 400){
            setIsValidUsername(!data['username_exists'])
            setIsvalidEmail(!data['email_exists'])
        }
    }

    const updateToken = async () => {
        if (loading){
            setLoading(false)
        }
        try {
            let response = await fetch('https://e-market-z2s5.onrender.com/users/api/token/refresh/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'refresh':authTokens?.refresh})
            })
            let data = await response.json()

            if (response.status === 200){
                setAuthTokens(data)
                localStorage.setItem('authTokens', JSON.stringify(data))
                setUser(jwtDecode(data.access))
            }
            else {
                setAuthTokens(null)
                localStorage.removeItem('authTokens')
                setUser(null)
                
            }
        } catch( error){
            console.log(error);
        }
        
    }

    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])


    let contextData = {
        user: user,
        authTokens: authTokens,
        userData: userData,
        isValidUsername: isValidUsername,
        isValidEmail: isValidEmail,
        login: login,
        logout: logout,
        getUserData: getUserData,
        createUser: createUser,
    }

    return(
        <LoginContext.Provider value={contextData}>
            {loading? <h1>Loading</h1> : children}
        </LoginContext.Provider>
    )
}