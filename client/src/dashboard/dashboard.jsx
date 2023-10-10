import {useCookies} from "react-cookie"
const Dashboard = ()=>{
const [cookies,removeCookie] = useCookies(['user'])
const user = cookies.user
console.log(user)
    return(
        <>User Dashboard {user.firstname}</>
    )
}

export default Dashboard