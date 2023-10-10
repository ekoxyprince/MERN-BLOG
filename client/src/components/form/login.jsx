import { NavLink } from 'react-router-dom'
import './form.css'

const Login = ()=>{
    return (
        <div className='container' style={{height:'100vh'}}>
            <div className='row mt-3'>
                <div className="col-md-12 d-flex align-center justify-content-center">
        <form>
            <div className='form__container'>
                <div className='form__title'>
                  <h3>Welcome Back!</h3>
                </div>
                <div className='form__division-1 margin-form-top'>
                   <div className='form__group'>
                   <input type="text" />
                    <label>Email</label>
                   </div>
                </div>
                <div className='form__division-1 margin-form-top'>
                   <div className='form__group'>
                   <input type="text" />
                    <label>Password</label>
                   </div>
                </div>
                <div className='form__division-1 margin-form-top'>
                     <div className='form__group'>
                        <button className='form__button'>Signin</button>
                     </div>
                </div>
                <p>Don't have an account? <NavLink to={'/signup'}>Signup</NavLink></p>
            </div>
        </form>
        </div>
        </div>
        </div>
    )
}

export default Login