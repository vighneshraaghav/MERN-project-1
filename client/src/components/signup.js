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
        navigate('/verification',{state:email});
        toast.success('Verification Email sent! Check your Email.');
      }
    } catch (error) {
      console.error('Error Signing up', error);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md p-6 bg-purple-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={handleUsernameChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:outline-none focus:ring-purple-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={handleEmailChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:outline-none focus:ring-purple-300"
              required
            />
            {!isValid && (
            <p className="text-red-600 text-sm mt-1">Please enter a valid email address.</p>
          )}
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
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:outline-none focus:ring-purple-300"
              required
            />
          </div>
          <button
            type='submit'
            className="w-full mb-4 bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
          >
            Sign Up
          </button>
          <p className="block text-center text-sm font-medium text-gray-700">Already a user?<button className='ml-1 text-purple-700' onClick={()=>navigate('/signin')}>Sign In</button></p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
