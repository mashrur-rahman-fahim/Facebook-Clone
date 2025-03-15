import React, { useEffect, useState } from 'react'
import { authentication } from '../auth/auth'
import {useNavigate} from 'react-router-dom';
import api from '../../api/axios';
import { Logout } from '../logout/Logout';

export const Dashboard = () => {
    const navigate=useNavigate();
    const [user,setUser]=useState(null);
   
     useEffect(()=>{
      
      const fetchUser=async()=>{
        const users=await authentication();
        if(!users){
          navigate('/');
        }
        setUser(users);
       
      }
      fetchUser();
     
     },[navigate])
  
    const handleLogout =async ()=>{
      setUser(null);
      await Logout();
      navigate('/');
    }
  
    
  return (
    <div>
        <h1>Welcome {user?.firstName} </h1>
        <p>This is your dashboard</p>
        <button onClick={handleLogout}>logout</button>
    </div>
  )
}
