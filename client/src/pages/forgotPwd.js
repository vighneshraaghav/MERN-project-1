import React, { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';


function ForgotPwd() {
  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = await axios.post("/forgot-password", {
        email,
      });
      console.log(userData);
      if (userData.error) {
        toast.error(userData.error);
      } else {
        if (userData.data.error) {
          toast.error(userData.data.error);
        } else {
          setEmail("");
          toast.success("Reset Link is sent to the Email");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center pt-12">
      <div className="w-full max-w-md p-6 bg-purple-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        <h4>We'll send a reset link to the email ID</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 p-2 w-full bg-purple-50 border rounded-md focus:ring focus:outline-none focus:ring-purple-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mb-4 bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPwd;
