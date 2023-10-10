import { NavLink } from 'react-router-dom'
import './form.css'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import { useAuth } from '../../providers/auth'

const Login = ()=>{
const auth = useAuth()
const [form,setForm] = useState({
    email:'',
    password:''
})
function handleChange(e){
    const {name,value} = e.target
    setForm(preValue=>{
        return{
            ...preValue,
            [name]:value
        }
    })
}
const [loading,setLoading] = useState(false)
const navigate = useNavigate()
const Toast = Swal.mixin({
    toast:'true',
    position:'top-end',
    showConfirmButton:false,
    timer:'3000',
    timerProgressBar:true,
    didOpen:(toast)=>{
        toast.addEventListener('mouseenter',Swal.stopTimer)
        toast.addEventListener('mouseleave',Swal.resumeTimer)
    }
})
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
                   <input onChange={handleChange} type="text" name='email' value={form.email} />
                    <label>Email</label>
                   </div>
                </div>
                <div className='form__division-1 margin-form-top'>
                   <div className='form__group'>
                   <input onChange={handleChange} type="password" name='password' value={form.password} />
                    <label>Password</label>
                   </div>
                </div>
                <div className='form__division-1 margin-form-top'>
                     <div className='form__group'>
                        <button onClick={(e)=>{
                        e.preventDefault()
                        setLoading(true)
                            axios.post('/api/v1/auth/signin',form)
                            .then(res=>{
                              Toast.fire({
                                icon:'success',
                                title:'Signed in successfully'
                              })
                              const user = res.data.body.data.user
                             auth.login(user)
                            })
                            .catch(error=>{
                                setLoading(false)
                                if(!error.response.data.success){    
                                    return Swal.fire({
                                        title:'Request Failed!',
                                        icon:'error',
                                        text:error.response.data.body?error.response.data.body.info[0].msg:'An error occured try again later',
                                        background:'var(--gold-linear, linear-gradient(315deg, #FFE5A1 0%, #BF841A 50.52%, #FFCD74 100%))',
                                        confirmButtonColor:'#BF841A'
                                    })
                                }
                            })
                        }} className='form__button'>{loading?<Spinner animation='border' role='status'></Spinner>:'Signin'}</button>
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