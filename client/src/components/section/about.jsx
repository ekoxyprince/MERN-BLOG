import './section.css'
import Title from '../title/title'
import img from '../../assets/images/about.png'

const About = ()=>{
    return (
        <section id='about'>
            <Title title='About Us'/>
            <div className='container'>
                <div className='row  mt-3'>
                   <div className='col-md-6'>
                    <p className='text-center about__text'>
                    In the vast expanse of the digital universe, there exists a portal that seamlessly merges the realms of technology and the cosmos—AstroBlog. As a dedicated tech blog with a celestial twist, AstroBlog takes readers on a captivating journey through the wonders of space and astronomy, all viewed through the lens of cutting-edge technology.
                    AstroBlog understands that in today's tech-driven world, the boundaries between science and science fiction are becoming increasingly blurred. This blog stands as a testament to the fascinating intersection of these two domains. It's a place where stargazers and tech enthusiasts unite, driven by a shared curiosity about the cosmos and a thirst for knowledge.
                    AstroBlog is more than just a repository of information; it's a thriving cosmic community. We invite readers to engage with us through comments, discussions, and social media. Share your own stargazing experiences, ask burning questions, and connect with fellow space enthusiasts who share your passion for the unknown.
                    </p>
                   </div>
                   <div className='col-md-6'>
                    <img className='about__img' src={img} alt="about" />
                   </div>
                </div>
            </div>
        </section>
    )
}

export default About