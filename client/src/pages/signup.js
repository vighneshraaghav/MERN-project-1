import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';



function SignUpPage() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  /////////////////
  const navigate = useNavigate()
  const [isValid, setIsValid] = useState(true)
  const handleEmailChange = (event) => {
    const newEmail = event.target.value
    setData({...data, email:newEmail})
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsValid(emailRegex.test(newEmail))
  };
  const handleUsernameChange = (event) => {
    setData({...data, name:event.target.value})
  };

  const handlePasswordChange = (event) => {
    setData({...data, password:event.target.value})
  };
    ///////////////


  const handleSubmit = async (e) => {
      e.preventDefault();
      const {name, email, password} = data
    try { 
      const {data} = await axios.post(
      '/register',{name, email, password}) 
      if(data.error){
        toast.error(data.error)
      }else{
        setData({});
        navigate('/verification',{state:{email:email,password:password,}});
        toast.success('Verification Email sent! Check your Email.');
      }
    } catch (error) {
      console.error('Error Signing up', error);
    }
  };
  return (
    <div className="flex justify-center pt-8">
      <div className="w-full max-w-md p-6 border backdrop-blur rounded-lg shadow-md">
        <h2 className="text-2xl text-blue-300 font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={handleUsernameChange}
              className="mt-1 p-2 w-full bg-transparent border text-white rounded-md focus:outline-none"
              required
            />
          </div>
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
            {!isValid && (
            <p className="text-red-600 text-sm mt-1">Please enter a valid email address.</p>
          )}
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
            type='submit'
            className="w-full mb-4 bg-transparent text-white p-2 mt-6 rounded-md hover:bg-blue-300 hover:text-black focus:outline-none focus:ring border"
          >
            Sign Up
          </button>
          <p className="block text-center text-sm font-medium text-white">Already a user?<button className='ml-1 text-blue-300' onClick={()=>navigate('/signin')}>Sign In</button></p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
