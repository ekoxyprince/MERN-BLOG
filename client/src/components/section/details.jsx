import './section.css'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/esm/Spinner'
import { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { socket } from '../../socket/socket'

const Details = ()=>{
    const [cookie,setCookie] = useCookies(['user'])
    const navigate = useNavigate()
    const {id} = useParams()
    const [blog,setBlog] = useState(null)
    useEffect(()=>{
        axios.get(`/api/v1/post/${id}`)
        .then(res=>{
          setBlog(res.data.body.data)
        })
    },[id])
    socket.on('like',(newLikes)=>{
    setBlog(newLikes)
    })
    if(blog=== null){
        return(<section style={{display:'flex',justifyContent:'center', marginTop:'20px'}}><Spinner animation='border'></Spinner></section>)
    }
    return(
        <section>
        <div className='container'>
            <div className='row mt-4'>
                <div className='col-md-12'>
                <Card className='bg-dark text-light'>
                    <Card.Img variant='top' src={blog.image}/>
                    <Card.Body>
                        <Card.Title>{blog.title}</Card.Title>
                        <Card.Text>{blog.content}</Card.Text>
                        <div className='col-lg-2 col-md-2 col-sm-2'>
                            <div className='row'>
                             <div style={{position:'relative'}} className={`col-md-6`}> <span onClick={()=>{
                                console.log(cookie)
                                if(!cookie.user){
                                 navigate('/signin')
                                }else{
                                    axios.patch('/api/v1/user/like',{
                                        postId:id
                                    })
                                    .catch(err=>{
                                        navigate('/login')
                                    })
                                }
                             }} style={{fontSize:'3rem',cursor:'pointer'}} className={`bx bx-like ${blog.likes.findIndex(like=>like.id ===cookie.user.id) >-1?'text-primary':''}`}></span>
                             <small>{blog.likes.length}</small></div>
                             <div className='col-md-6'>
                             <span style={{fontSize:'3rem',cursor:'pointer'}} className='bx bx-comment'></span>
                             <small>{blog.comments.length}</small>
                             </div>
                             </div>
                        </div>
                    </Card.Body>
                </Card>
                </div>
            </div>
        </div>
        </section>
    )
}
export default Details