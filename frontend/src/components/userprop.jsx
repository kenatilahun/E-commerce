


// function useReturninguser()
// {  
//   const[user,setUser]=useState(null)
  
//     useEffect(()=>{
//         const token = localStorage.getItem("token");
//       console.log("Token:", token);
//         if(!token) return;
//         const fetchUser2=async () =>{
//             try{
//         const res = await axios.get("http://localhost:5000/profile", {
//           headers: { Authorization: `Bearer ${token}`},
//         });
//         if(res.status >= 200 && res.status < 300){
//             setUser(res.data);
//             console.log("User fetched:", res.data);


//         }else{
//             setUser(null)
//         }

//             }
//             catch(error){
//               console.error("Error fetching user:", error);
//               setUser(null)}
            
 
//  } ;
//  fetchUser2();
//              },[]);
//              return user;// hook only returns data, not JSX
//   }

// export default useReturninguser;



// function App3() {
//   // Step 1: Keep token in state + read from localStorage at start
//   const [token, setToken] = useState(localStorage.getItem("token") || "");

//   // Step 2: Handle login success
//   const handleLogin = (newToken) => {
     
//     localStorage.setItem("token", newToken); // save for persistence
//     setToken(newToken); // update state instantly
//   };

//   // Step 3: Handle logout
//   const handleLogout = () => { 
//     localStorage.removeItem("token");
//     setToken(""); // reset state
//   };



//   return (
//     <div>
//          <Router token={token} onLogin={handleLogin} onLogout={handleLogout} />
//     </div>
//   )
// }

// export default App3;
