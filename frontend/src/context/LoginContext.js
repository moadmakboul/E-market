import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'


export const LoginContext = createContext(null)

export const LoginContextProvider = ({children}) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState([])
    const [loading , setLoading] = useState(true)
    const navigate = useNavigate()

    const login = async(e) => {
        e.preventDefault()

        let response = await fetch('http://127.0.0.1:8000/users/api/token/',{
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
    }

    const getUserData = async (authTokens) => {
        let response = await fetch('http://127.0.0.1:8000/users/get_user/', {
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

    const updateToken = async () => {
        let response = await fetch('http://127.0.0.1:8000/users/api/token/refresh/',{
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
        }else {
            logout ()
        }

        if (loading){
            setLoading(false)
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
        login: login,
        logout: logout,
        getUserData: getUserData,
    }

    return(
        <LoginContext.Provider value={contextData}>
            {loading? null : children}
        </LoginContext.Provider>
    )
}