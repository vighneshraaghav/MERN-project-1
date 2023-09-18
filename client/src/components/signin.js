import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'

function SignInPage() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
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
        console.log(userData);
        setData({
          email: '',
          password: '',
        });
        window.localStorage.setItem("loggedIn",true);
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md p-6 bg-purple-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={handleEmailChange}
              className="mt-1 p-2 w-full bg-purple-50 border rounded-md focus:ring focus:outline-none focus:ring-purple-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={data.password}
              onChange={handlePasswordChange}
              className="mt-1 p-2 w-full bg-purple-50 border rounded-md focus:ring focus:outline-none focus:ring-purple-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mb-4 bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
          >
            Sign In
          </button>
          <p className="block text-center text-sm font-medium text-gray-700">New user?<button className='ml-1 text-purple-700' onClick={()=>navigate('/signup')}>Sign Up</button></p>
        </form>
      </div>
    </div>
  );

}

export default SignInPage;
