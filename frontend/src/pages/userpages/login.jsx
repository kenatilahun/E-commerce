import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import{BrowserRouter,Routes,Route,Link, useNavigate, redirect,useLocation} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {useLoginMutation} from "../../redux/ApiSlices/authApiSlice" 
import {setCredentials} from "../../redux/featureSlices/authSlice"

function Login(){
    const [email,setEmail]=useState("");
    const [password,setPass]=useState("");

const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirecturl = sp.get('redirect') || '/';
const userInfo= useSelector((state) => state.auth.userInfo);
    const navigate=useNavigate()
     const dispatch=useDispatch();
     const [login,{isLoading,error}]=useLoginMutation();
 useEffect(()=>{
if(userInfo){
   navigate(redirecturl);
} 
},[navigate,redirecturl,userInfo])


     
     const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
       const res= await login({email,password}).unwrap();
       console.log(res.user); 
       dispatch(setCredentials({res}));
    }

     catch (err) {
      console.error("Login failed:", err);
console.log("Error Message:", err.error);
      alert(err.response?.data?.message || "Login failed");}
 } 


   return( 
     <div className="flex items-center min-h-[500px]  justify-center  bg-gray-900">
<div className=" flex min-h-[400px] items-center min-w-[200px]  justify-center bg-gray-400 translate-y-[-50px]">
    <div>
 <h1><center>Login</center></h1>
<form onSubmit={handlesubmit}>
<div><label htmlFor="email"><strong>email:</strong></label>
<input type="email"
placeholder='enter email'
name='email'
autoComplete="off"
className='form-control rounded-0'

   onChange={(e)=>setEmail(e.target.value)}
/>
</div>

<div>
<label htmlFor="password"><strong>password:</strong></label>
<input type="password"
placeholder='enter password'
name='password'
onChange={(e)=>setPass(e.target.value)}
autoComplete="off"
className='form-control rounded-0'
/>
</div>


<button type="submit">Login</button>
</form>
<p>don't have account</p>
<Link to="/register">Sign up</Link></div>

</div>

</div>  

)
}

export default Login















// import React, { useState } from "react";
// import axios from "axios";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//        "http://localhost:5000/api/users/login",
//         { email, password },
//         // include cookies
//       );

//       console.log(res.data); // backend response
//       setMessage(res.data.message || "Login successful");

//       // Save user info to localStorage if needed
//       localStorage.setItem("userInfo", JSON.stringify(res.data.user));
//     } catch (err) {
//       console.error(err);
//       setMessage(
//         err.response?.data?.message || "Login failed. Check your credentials"
//       );
//     }
//   };

//   return (
//     <div style={{ padding: "50px", maxWidth: "400px", margin: "auto" }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{ width: "100%" }}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{ width: "100%" }}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default Login;
