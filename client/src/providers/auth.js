import { useContext,createContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie'

const AuthContext = createContext(null)

export const AuthProvider = ({children})=>{
    const navigate = useNavigate()
    const [cookies,setCookie,removeCookie] = useCookies(['user'])
    const [user,setUser] = useState(cookies.user)
    const login = (user)=>{
    setCookie('user',JSON.stringify(user),{maxAge:15*60})
    navigate('/user/dashboard')
}
    const logout = ()=>{
        removeCookie("user")
        navigate('/signin')
    }
    return(
        <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = ()=>{
   return (
    useContext(AuthContext)
   )
}