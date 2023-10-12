import {useCookies} from "react-cookie"
import './dashboard.css'
import Sidebar from "../components/sidebar/sidebar"
import axios from "axios"

const Dashboard = ()=>{
const [cookies,setCookie] = useCookies(['user'])
console.log(axios.get('/api/v1/user/details'))
const user = cookies.user
console.log(user)
    return(
        <div className="dashboard">
          <Sidebar/>
          <div className="row mt-5">
            <div className="col-md-6">
                   Yes
            </div>
            <div className="col-md-6">
                   No
            </div>
            </div>  
        </div>
    )
}

export default Dashboard