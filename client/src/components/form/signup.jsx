import './form.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const Signup = ()=>{
const [form,setForm] = useState({
    firstname:'',
    lastname:'',
    email:'',
    password:''
})
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
function handleChange(e){
 const {name,value} = e.target
 setForm((preValue)=>{
    return{
        ...preValue,
        [name]:value
    }
 })
}
    return (
        <div className='container' style={{height:'100vh'}}>
            <div className='row mt-3'>
                <div className="col-md-12 d-flex align-center justify-content-center">
        <form>
            <div className='form__container'>
                <div className='form__title'>
                  <h3>Get Started!</h3>
                </div>
                <div className='form__division-2 margin-form-top'>
                   <div className='form__group'>
                   <input onChange={handleChange} type="text" name='firstname' value={form.firstname} />
                    <label>Firstname</label>
                   </div>
                   <div className='form__group'>
                   <input onChange={handleChange} type="text" name='lastname' value={form.lastname} />
                    <label>Lastname</label>
                   </div>
                </div>
                <div className='form__division-2 margin-form-top'>
                <div className='form__group'>
                   <input onChange={handleChange} type="text" name='email' value={form.email}/>
                    <label>Email</label>
                   </div>
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
                            axios.post('/api/v1/auth/signup',form)
                            .then(res=>{
                              Toast.fire({
                                icon:'success',
                                title:'Signed up successfully'
                              })
                              setTimeout(()=>{
                              navigate('/signin')
                              },3000)
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
                        }} className='form__button'>{loading?<Spinner animation='border' role='status'></Spinner>:'Signup'}</button>
                     </div>
                </div>
                <p>Already have an account? <NavLink to={'/signin'}>Signin</NavLink></p>
            </div>
        </form>
        </div>
        </div>
        </div>
    )
}

export default Signup