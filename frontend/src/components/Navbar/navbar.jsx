import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import{Routes,Route,Link,useNavigate} from "react-router-dom";
import Myaccount from "./Myaccount";
import CategorySidebar from "../CatagoryItemMenu";
function App1() {
  const [isOpe, setIsOpe] = useState(false); // state to track sidebar

  const toggleSidebar = () => {
    setIsOpe(!isOpe); // toggle open/close
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Button to open/close sidebar */}
      <button
        onClick={toggleSidebar}
        className="m-4 p-2 bg-blue-500 text-white rounded"
      >
        {isOpe ? "Close Sidebar" : "Open Sidebar"}
      </button>

      {/* Sidebar */}
      <div
  className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ${
    isOpe ? "translate-x-0" :"-translate-x-70"
  }`}
>

        <h2 className="text-2xl font-bold p-4">Sidebar</h2>
        <ul className="p-4">
          <li className="p--2 hover:bg-gray-700 cursor-pointer">Home</li>
          <li className="p--2 hover:bg-gray-700 cursor-pointer">Services</li>
          <li className="p--2 hover:bg-gray-700 cursor-pointer" >Contact</li>
          <li className="p--2 hover:bg-gray-700 cursor-pointer">Kena</li>
        </ul>
      </div>

      {/* Optional overlay */}
      {isOpe && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50"
        ></div>
      )}

      {/* Main content */}
      <div className="p-4 ml-0 md:ml-64 transition-all duration-300">
        <h1 className="text-3xl">Main Content</h1>
        <p>This is the main content of your page.</p>
      </div>
    </div>
)  ;
}













function User(){
const [isOn,setIsOn]=useState(false);
const handletoggle=()=>{
  (setIsOn(!isOn))
} 
return(<div><div onClick={handletoggle}>user</div>
{isOn&&<div><h1>KENA</h1></div>}

<button className="bg-green-500 active:bg-yellow-200 text-white font-bold py-2 px-4 rounded">clickme</button>
</div>) 
 };







function Home()
{return(<div><h1>hompage</h1></div>)}
function About()
{ return(
<div>
  
<h1>e-commerce</h1>
</div>  )}
function Contact()
{ 
    return<h1>here is contact</h1>  }

     
function Humbergernavigation(){ 
  const [open,setopen]=useState(false);
  const [active,setactive]=useState(false);
  const HandleToggle=()=>{
    setopen(!open);
    if(open){setactive(false)}}
  
  return (
    
    // <BrowserRouter>
   <div >
      <button onClick={HandleToggle} 
      className="flex flex-col justify-center items-center w-40 h-10 bg-gray-800 text-red rounded-lg p-2 focus:outline-none active:big-blue-700"
      >≡Menu</button>
    {open&&(<div className="absolute right-0  mt-40 w-40 bg-red-500 shadow-lg rounded-lg flex flex-col">
      <Link to="/home"onClick={()=>setactive(true)}
    className="p-2 hover:bg-gray-500 cursor-pointer">Home</Link> 
    <Link to="/about"onClick={( )=>setactive(true)}
    className="p-2 hover:bg-gray-500 cursor-pointer">About</Link>
    <Link to="/contact"onClick={()=>setactive(true)} 
    className="p-2 hover:bg-gray-500 cursor-pointer">Contact</Link>
    </div>)}
    {active&&
    (
     
      <Routes>
        <Route path="/home"element={<Home/>}/>   
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
    </Routes>
    )}
    </div>
// </BrowserRouter> 
  );
}




function Search() {

  const [query, update]=useState("");
  const [products, setItems] = useState([]);

const fetchProducts = () => {
    fetch(`http://localhost:5000/products?keyword=${query}`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));


  };
  return (
    <div>
  
      <input type="text"
      value={query}
      onChange={(e)=>{update(e.target.value)}}
      className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-400 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
      <button onClick={fetchProducts}>Search</button>
    
      <ul>{products.map((item)=>(<li key={item._id}><h1>{item.name}_${item.price}</h1></li> ))} 
      </ul>
      
      
    </div>
  )
}

function Cart(){


}












// function Returninguser2 ()
// {
// const user=useReturninguser();
// const handleLogout=()=>{
//   localStorage.removeItem("token");
//   // window.location.reload(); // or navigate to login
//   navigate("/login");
// }
// return (
//   <div>
//     <Myaccount user={user} Logout={handleLogout}/>
//   </div>
// ); 
// }







































 
import UploadImage from '../../pages/adminpages/createproduct';








function Navbar(){  
return(
<nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
  <User/>
  <Search/>
  <Myaccount/>
  
<Humbergernavigation/>
  <CategorySidebar/>

</nav>)
}
// export default {Navbar,App1 }
export default Navbar