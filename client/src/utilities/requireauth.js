import { useAuth } from "../providers/auth";
import { useCookies } from "react-cookie";
import { Navigate,useLocation } from "react-router-dom";

const IsAuth = ({children})=>{
    const [cookies,setCookie] = useCookies(['user'])
    const location = useLocation()
    if(!cookies.user){
        return(
            <Navigate to={'/signin'} /> 
        )
    }else{
    return children
}
}

export default IsAuth