import './sidebar.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../providers/auth'


const Sidebar = ()=>{
   const auth = useAuth()
   return(
   <aside>
      <div className="logo">
      <h3>AstroBlog</h3>
      </div>
      <div className='sidebar'>
      <NavLink className={'toggled'}>
         <span className='bx bxs-dashboard'></span>
         <h3>Dashboard</h3>
      </NavLink>
      <NavLink>
         <span className='bx bx-news'></span>
         <h3>My Blogs</h3>
      </NavLink>
      <NavLink>
         <span className='bx bx-edit'></span>
         <h3>Create Blog</h3>
      </NavLink>
      <NavLink>
         <span className='bx bx-cog'></span>
         <h3>Settings</h3>
      </NavLink>
      <a href='#' onClick={()=>{
       auth.logout();
      }}>
         <span className='bx bx-exit'></span>
         <h3>Logout</h3>
      </a>
      </div>
   </aside>
   )
}

export default Sidebar 