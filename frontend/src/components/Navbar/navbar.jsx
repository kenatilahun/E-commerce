import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import{Routes,Route,Link,useNavigate} from "react-router-dom";
import Myaccount from "./Myaccount";
// import CategorySidebar from "../CatagoryItemMenu";
import AllCategoriesButton from "../Categories/AllCategoriesButton";
import Search from "../Search";



















     




function Cart(){

  return(
    <div>
      <h1>cart</h1>
    </div>
  )
}

function Navbar(){  
return(
  <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        
        <Link to="/" className="text-lg font-semibold tracking-tight text-slate-900">
          Storefront
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xl">
          <Search/>
         
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <AllCategoriesButton />
        </div>
        <div className="hidden md:block">
          {/* <CategorySidebar/> */}
        </div>
        <Myaccount/>
        
      </div>
    </div>
     
  </nav>
)
}
// export default {Navbar,App1 }
export default Navbar
