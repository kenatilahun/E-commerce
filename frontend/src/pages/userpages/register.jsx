import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import{BrowserRouter,Routes,Route,Link, useNavigate} from "react-router-dom";
import axios from 'axios';

function Register (){
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPass]=useState("");
const navigate=useNavigate()

const handlesubmit=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:5000/register",{name,email,password})
    .then(result=>{console.log(result)
     navigate("/login")})

    .catch(err=>{console.log(err)})                              
    
    }
    return(
<div>
<div>

<h2><center>signup</center></h2>
<form onSubmit={handlesubmit}>

<div>
<label htmlFor= "name"><strong>Name:</strong></label>

   <input
   id="name"
   type="text"
   name="name"
   placeholder="enter your name"
   onChange={(e)=>setName(e.target.value)}
   autoComplete="off"
   />   
   </div> 

   
 <div>
<label htmlFor= "email"><strong>Email:</strong></label>
  <input
   id="email"
   type="email"
   name="email"
   placeholder="enter email"
   onChange={(e)=>setEmail(e.target.value)}
   autoComplete="off"
   />   
   </div> 


    <div>
<label htmlFor= "password"><strong>password:</strong></label>
  <input
   id="password"
   type="password"
   name="password"
   placeholder="enter your password"
   onChange={(e)=>setPass(e.target.value)}
   autoComplete="off"
   />   
   </div> 

<button type="submit">SignUp</button>
 </form>
 <p>already have an account?</p>
 <Link to="/login">Login</Link>
 <Link to="/profile">view profile</Link>
 </div>
 </div>
    )


}
export default Register