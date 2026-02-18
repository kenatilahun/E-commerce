import { useEffect,useState} from "react";
import axios from 'axios'
// function Profile2(){
//     const [profile,setProfile]=useState({name:"",email:"",password:''
//         // ,avatar:""
//         });
//     const[loading,setLoading]=useState(false);
//     const[error,setError]=useState("");
    
    

//      useEffect(()=>{const fetchdata=()=>{
//         const fetchProfile=async()=>{

//            try {
//             const {data}=await axios.get();
//             setProfile();

//            }


      
//         catch{}                    }
//      } 
//     },[])
//     if(loading){return <div>Loading...</div>}
//     if(! profile){return<div>user not found</div>}

//     const handlesave=async()=>{
//         try{
//             setLoading(true);
//             setError("");
//              await axios.put("",profile);
//         }catch(err){
//             console.error(err);
//             setError("failed to save profile");
//         }finally{
//             setLoading(false);
//         }

//     }

// return( 
// <div>
//     <h2>user profile</h2>
//     {/* {profile.avatar&&<img/>} */}
//     <p><strong>Name:</strong>{profile.name}</p>
//     <p><strong>Email:</strong>{profile.email}</p>
//     <p><strong>password:</strong>{profile.password}</p>
//     <input 
//     type="text"
//     value={profile.name}
//     onChange={(e)=>
//     setProfile({...profile,name:e.target.value})
//     }/>
//     <br/>
//     <input 
//     type="text"
//     value={profile.email}
//     onChange={(e)=>
//     setProfile({...profile,email:e.target.value})
//     }/>
//     <br/>

//     <br/>
//     <input 
//     type="text"
//     value={profile.password}
//     onChange={(e)=>
//     setProfile({...profile,password:e.target.value})
//     }/>
//     <br/>
//     {/* Save Button */}
//     <button onClick={handlesave} disabled={loading}>{loading? "saving...":"save"}</button>
//     {/* Error message */}
//      {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>



// )
function Profile2(){
     return(
        < div class="min-h-[400vh]" >
{/* <div class="bg-gray-200 p-4">
  {/* <!-- Relative --> */}
  {/* <div  class="relative top-4 bg-blue-500 p-2 text-white"> */}
    {/* Relative Box */}
  {/* </div> */ } */ 
  {/* } */}

  {/* <div class="h-screen bg-gray-100 p-4">
  <div class="sticky top-0 bg-blue-500 text-white p-4">
    I’m Sticky! Scroll down...
  </div>
  <p class="mt-40">Content...</p>
  <p class="mt-40">More content...</p>
  <p class="mt-40">Keep scrolling...</p>
  <p class="mt-40">I stop sticking once parent ends</p> */}




<div class="min-h-[200vh] bg-gray-100 p-4">
  <div class="sticky top-0 bg-blue-500 text-white p-4">
    I’m Sticky! Scroll down...
  </div>
  <p class="mt-40">Content...</p>
  <p class="mt-40">More content...</p>
  <p class="mt-40">Keep scrolling...</p>
  <p class="mt-40">I stop sticking once parent ends</p>
</div>






{/* // </div> */}

</div>









// {
    /* <div class="bg-gray-200 p-4 h-40 ">
  <div class="absolute top-0 left-0 bg-red-400 p-2">Absolute Box</div>
</div>
<div class="bg-green-300 p-4">Box 2</div>
 */
// }




// </div>

 )

}
export default Profile2