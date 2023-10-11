import {useCookies} from "react-cookie"
import './dashboard.css'
import Sidebar from "../components/sidebar/sidebar"
const Dashboard = ()=>{
const [cookies,setCookie] = useCookies(['user'])
const user = cookies.user
console.log(user)
    return(
        <div className="dashboard">

          <div>
          <Sidebar/>
          </div>
          <div>
            Hello hdgsdghsghsdghsdg
            </div>  
        </div>
    )
}

export default Dashboard