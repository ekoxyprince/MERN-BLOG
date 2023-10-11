import './sidebar.css'
import { NavLink } from 'react-router-dom'


const Sidebar = ()=>{
   return(
    <div className='sidebar'>
      <div className='nav__logo'>
            <h3>AstroBlog.</h3>
          </div>
     <ul>
        <li>
        <span className='fas fa-home'></span> <NavLink to={'/user/dashboard'}>Dashboard</NavLink>
        </li>
        <li>
       <span className='fas fa-pen'></span> <NavLink to={'/user/create_blog'}>Create Blog</NavLink>
        </li>
        <li>
        <span className='fas fa-file'></span>  <NavLink to={'/user/view_blog'}>My Blogs</NavLink>
        </li>
        <li>
        <span className='fas fa-cog'></span> <NavLink to={'/user/details'}>My Details</NavLink>
        </li>
     </ul>
    </div>
   )
}

export default Sidebar 