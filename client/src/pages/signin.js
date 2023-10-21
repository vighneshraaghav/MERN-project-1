import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';

function SignInPage() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  
  const dispatch = useDispatch();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setData({...data,email:event.target.value});
  };

  const handlePasswordChange = (event) => {
    setData({...data,password:event.target.value});
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const{email, password} = data;
    try {
      const userData = await axios.post('/login',{
        email, password
      })
      if(userData.error){
        toast.error(userData.error)
      }else{
        if(userData.data.error){
          toast.error(userData.data.error)
        }else{
          setData({
            email: '',
            password: '',
          });
          //console.log(userData);
          dispatch(authActions.login());
          navigate('/profile')
      }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center pt-12">
      <div className="w-full max-w-md p-6 border backdrop-blur rounded-lg shadow-md">
        <h2 className="text-2xl text-blue-300 font-semibold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={handleEmailChange}
              className="mt-1 p-2 w-full bg-transparent border text-white rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={data.password}
              onChange={handlePasswordChange}
              className="mt-1 p-2 w-full bg-transparent border text-white rounded-md focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mb-4 bg-transparent text-white p-2 mt-6 rounded-md hover:bg-blue-300 hover:text-black focus:outline-none focus:ring border"
          >
            Sign In
          </button>
          <div className='flex justify-center space-x-6'>
          <p className="block text-center text-sm font-medium text-white">New user?<button className='ml-1 text-blue-300' onClick={()=>navigate('/signup')}>Sign Up</button></p>
          <p className="block text-center text-sm font-medium text-white">Forgot Password?<button className='ml-1 text-blue-300' onClick={()=>navigate('/forgot-password')}>Click Here</button></p>
          </div>
        </form>
      </div>
    </div>
  );

}

export default SignInPage;
