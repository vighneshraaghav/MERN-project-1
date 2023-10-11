import React, { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate, useParams } from "react-router-dom";


function ResetPwd() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {id,token} = useParams();
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = await axios.post(`/reset-password/${id}/${token}`, {
        password,
      });
      console.log(userData);
      if (userData.error) {
        toast.error(userData.error);
      } else {
        if (userData.data.error) {
          toast.error(userData.data.error);
        } else {
          setPassword("");
          toast.success("Password Reset Successful");
          navigate('/signin');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center pt-12">
      <div className="w-full max-w-md p-6 bg-purple-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 p-2 w-full bg-purple-50 border rounded-md focus:ring focus:outline-none focus:ring-purple-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mb-4 bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPwd;