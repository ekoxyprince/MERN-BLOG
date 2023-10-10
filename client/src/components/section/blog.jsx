import Title from '../title/title'
import './section.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Blog = (props)=>{
const [blogs,setBlog] = useState(null)
useEffect(()=>{
axios.get('/api/v1/posts')
.then(res=>{
    setBlog(res.data.body.data)
})
},[])
if(!blogs){
    return(<section>
            <Title title="Our Blog"/>
            <div className='container mt-3' style={{display:'flex',justifyContent:'center'}}>
           <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
           </Spinner>
            </div>
        </section>) 
}
    return(
        <section>
            <Title title="Our Blog"/>
            <div className='container'>
            <div className='row my-4'>
                {blogs.map(blog=>{
                    return(
                        <div className="col-md-3">
                        <Card>
                         <Card.Img variant='top' src={blog.image}/>
                         <Card.Body>
                            <Card.Title>{blog.title}</Card.Title>
                            <Card.Text>{blog.content.length>30?(blog.content).slice(0,30)+"...":blog.content}</Card.Text>
                            <div style={{display:'flex',justifyContent:'center'}}>
                            <Button variant='primary'><NavLink style={{color:'white',textDecoration:'none'}} to={`/blog_details/${blog._id}`}>Read More</NavLink></Button>
                            </div>
                         </Card.Body>
                        </Card>
                        </div>
                    )
                })}
              
            </div>
            </div>
        </section>
    )
}

export default Blog