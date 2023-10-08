import { Routes,Route } from "react-router-dom";
import Home from "../pages/home";
import AboutSection from "../pages/about";
import BlogSection from "../pages/blog";

const Pages = () =>{
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<AboutSection/>} />
            <Route path="/blog" element={<BlogSection/>} />
        </Routes>
    )
}

export default Pages