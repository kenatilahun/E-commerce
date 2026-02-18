import react from "react"
import {Routes,Route} from "react-router-dom";
import Layout from '../components/Navbar/layout';
import Login from '../pages/userpages/login';
import Profile from '../pages/userpages/profile2';
import Register from '../pages/userpages/register';
import Profile2 from '../pages/userpages/profile';
import MYaccount from "../pages/userpages/myaccount";
// import ProductListPage from "../pages/userpages/categorypagelist";
import CreateProductForm from "../pages/adminpages/createproduct";
function Router(){
       
 return(
    
        <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Login/>}/>
        <Route path="/login"element={<Login/>}/>
        <Route path="/profile"element={<Profile/>}/>
       <Route path="/Createproduct"element={<CreateProductForm/>}/>
        
        <Route path="myaccount" element={<MYaccount/>}>
        <Route path="pro" element={<Profile2/>}/>
        <Route index element={<Register/>}/>
        </Route>
      

        </Route>
        </Routes>
 )
 
  } 
        
        

export default Router