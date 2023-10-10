import { Routes,Route } from "react-router-dom";
import Home from "../pages/home";
import BlogSection from "../pages/blog";
import Signin from "../pages/signin";
import Register from "../pages/signup";
import Dashboard from "../dashboard/dashboard";
import IsAuth from "../utilities/requireauth";

const Pages = () =>{
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/blog" element={<BlogSection/>} />
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Register/>}/>
            <Route path="/user/dashboard" element={<IsAuth><Dashboard/></IsAuth>}/>
        </Routes>
    )
}

export default Pages