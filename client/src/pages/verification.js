import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Verification = ()=> {
  const navigate = useNavigate();
   const location = useLocation();
   const creds =location.state;
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  // // const {data} = await axios.get(
  // //   '/verified/:email')
  console.log(creds.email, creds.password);
  console.log(data.verified);
  useEffect(() => {
    const verify = async () => {
      try {
        const result = await axios.get(`/verified/${creds.email}`);
        setData(result.data.user);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      }
    };

    verify();
  }, [creds]);

  const login = async(email, password)=>{
    try {
      console.log(email, password);
      const userData = await axios.post('/login',{
        email, password
      })
      if(userData.error){
        toast.error(userData.error)
      }else{
        if(userData.data.error){
          toast.error(userData.data.error)
        }else{
        console.log(userData);
        setData({
          email: '',
          password: '',
        });
        window.localStorage.setItem("loggedIn",true);
        navigate('/profile');
      }
      }
    } catch (error) {
      console.log(error);
    }
  }

  try {
    if(data.verified===true){
      login(creds.email, creds.password);
    }else{
      return (
        <div>
          <h1>Verification mail sent for {creds.email}</h1>
        </div>
      )
    }
  } catch (error) {
    
  }
  
}


export default Verification