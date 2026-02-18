import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"
function MYaccount(){
    return(
    <div className="absolute">
    <h1> My Account</h1>
    <Link to="pro" >My Profile</Link>
    <Link  to="" >register</Link>
     <div><Outlet/></div>
    </div>

)
}
export default MYaccount