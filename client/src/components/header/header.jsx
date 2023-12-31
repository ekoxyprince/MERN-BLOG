import './header.css'
import { NavLink } from 'react-router-dom'



const Header = ()=>{
function handleNav(){
const navBar = document.querySelector('.nav__bar')
navBar.classList.toggle('active')
}
    return (
        <header>
          <div className='nav__logo'>
            <h3>AstroBlog.</h3>
          </div>
          <nav className='nav__bar'>
          <NavLink className={'nav__link'} to={'/'}>Home</NavLink>
          <a className={'nav__link'} href='#about'>About</a>
          <NavLink className={'nav__link'} to={'/blog'}>Blog</NavLink>
          <NavLink className={'nav__link'} to={'/signin'}>Login</NavLink>
          </nav>
          <div className='nav__menu'>
           <i onClick={handleNav} className='navmenu bx bx-menu'></i>
          </div>
        </header>
    )
}

export default Header