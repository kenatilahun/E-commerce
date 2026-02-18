import { useState } from "react";

const Search=()=>{
    const [ON,r]=useState("") 

const [count,setCount]=useState(0) 
console.log("Ecommerce")
return(
<div>
    <input type="text"
    value={ON}
    onChange={(e)=>{r(e.target.value)}}/>
    <p>{count}</p> 
    <h1>{ON}</h1>
<button onClick={function(){setCount(count+1)}}>search</button> 
</div>);
}
export default Searc




export {Search,Humbergernavigation}







code2
