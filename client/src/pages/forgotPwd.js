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
    <div className="flex mt-8 justify-center pt-12">
      <div className="w-full max-w-md p-6 border backdrop-blur rounded-lg shadow-md">
        <h2 className="text-2xl text-blue-300 font-semibold mb-4">Forgot Password</h2>
        <h4 className="pb-4 font-medium text-white">We'll send a reset link to the email ID</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 p-2 w-full bg-transparent border text-white rounded-md focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mb-4 bg-transparent text-white p-2 mt-6 rounded-md hover:bg-blue-300 hover:text-black focus:outline-none focus:ring border"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPwd;
