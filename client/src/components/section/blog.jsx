import Title from '../title/title'
import './section.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Carousel from 'react-bootstrap/Carousel'
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
                        <div className="col-md-12">
                        <Carousel>
                {blogs.map(blog=>{
                    return(
                        <Carousel.Item>
                         <Card.Img variant='top' className='cardImg' src={blog.image}/>
                         <Carousel.Caption>
                            <h2>{blog.title}</h2>
                            <p>{blog.content.length>30?(blog.content).slice(0,30)+"...":blog.content}</p>
                            <div style={{display:'flex',justifyContent:'center'}}>
                            <Button variant='outline-dark'><NavLink style={{color:'white',textDecoration:'none'}} to={`/blog_details/${blog._id}`}>Read More</NavLink></Button>
                            </div>
                         </Carousel.Caption>
                         </Carousel.Item>
                    )
                })}
                </Carousel>
                </div>
              
            </div>
            </div>
        </section>
    )
}

export default Blog