// src/components/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const { id } = useParams(); // Get user ID from URL

  useEffect(() => {
    const fetchUser = async () => {
      
      try {
const token= localStorage.getItem("token")

        if (!token) {
          console.log("No token found!");
          return;
        }




        
        const response= await axios.get("http://localhost:5000/profile",{
          headers:{ Authorization:`Bearer ${token}`}
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
   fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>User not found here bruh.</div>;
  }

  return (
    <div>
      <h1>Name:{user.name}</h1>
      <p>Email: {user.email}</p>
      {/* <p>Bio: {user.bio}</p> */}
      {/* Add profile picture display and edit button */}
      
    </div>
  );
  
};
export default Profile;
