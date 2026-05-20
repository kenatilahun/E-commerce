import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./navbar"

function Layout () {
    const location = useLocation()
    const hideNavbar = ["/", "/login", "/register"].includes(location.pathname)
    return(
        <div>
        {!hideNavbar && <Navbar/>}
        <main>
        <Outlet/>
        </main>
        {/* <Footer/> */}
        </div> 
    )
}
export default Layout
