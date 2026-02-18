import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect,useState , useRef} from 'react';
import { logout } from '../../redux/featureSlices/authSlice';
import { useLogoutMutation } from '../../redux/ApiSlices/authApiSlice';

// import { resetCart } from '../../redux/featureSlices/cartSlice';


function Myaccount(){
  const [open,setOpen]=useState(false);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
const dropdownRef = useRef(null);
  const handletoggle=()=>{
    setOpen(!open)
  }

const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);




  const userInfo=useSelector((state)=>state.auth.userInfo);
  // const user = userInfo; // alias used in the JSX 

  const getUserInitials = () => {
    if(!userInfo?.name) return '';
    return userInfo.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }




  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      
      // dispatch(resetCart());
      // navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const Logout = () => {

    // placeholder for logout logic, e.g. dispatch(logout())
  }

  if(!userInfo){
    return(
    <div className="hover:bg-yellow-500 cursor-pointer">
                {/* <Link to="/" className="bg-red-500 "> Login in</Link>
                <Link to="myaccount/pro" className="bg-red-500 ">Sign up</Link> */}

                <div>Logout</div>
                 <div>myaccount/pro</div>

              </div>
    )
  }

  return(
    <div>
      <button className="absolute" onClick={handletoggle}>
        {userInfo.avatar ? (
          <img src={userInfo.avatar}
               alt={userInfo.name} width={30}
               height={30}/>
        ) : (
          <span>{getUserInitials()}</span>
        )}
        <span>{userInfo.name}</span>
      </button>

      {open && (
        <div className="absolute mt-5" >
          
              <div>
                <Link to="myaccount/pro" className="bg-red-500 ">My Profile</Link>
                <div onClick={logoutHandler}>LogoutO</div>
              </div>
              <div>
                <div onClick={() => navigate('/')}> My Order/Order history</div>
                <div onClick={Logout}>Logout</div>
              </div>
           </div> 
          )}
        
      </div>
    )
     }

export default Myaccount








