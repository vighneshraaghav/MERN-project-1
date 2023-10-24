import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import toast from "react-hot-toast";

function Registration() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const location = useLocation();
  const creds = location.state && location.state.eventName;

  const handleFirstName = (event) => {
    setData({ ...data, firstName: event.target.value });
  };

  const handleLastName = (event) => {
    setData({ ...data, lastName: event.target.value });
  };

  const handleNumber = (event) => {
    setData({ ...data, phoneNumber: event.target.value });
  };

  const handleAddress1 = (event) => {
    setData({ ...data, address1: event.target.value });
  };

  const handleAddress2 = (event) => {
    setData({ ...data, address2: event.target.value });
  };

  const handleCity = (event) => {
    setData({ ...data, city: event.target.value });
  };

  const handleState = (event) => {
    setData({ ...data, state: event.target.value });
  };

  const handlePincode = (event) => {
    setData({ ...data, pincode: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventStatus = await axios.post("/eventregister", {
      email: user.email,
      creds,
      personalDetails: data,
    });
    if (eventStatus.error) {
      toast.error(eventStatus.error);
    } else {
      if (eventStatus.data.error) {
        toast.error(eventStatus.data.error);
      } else {
        setData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          pincode: "",
        });
        toast.success(eventStatus.data.message)
        navigate("/profile");
      }
    }
  };

  if (!creds) {
    return <Navigate to="/profile" />;
  } else {
    return (
      <div className="p-8 text-white">
        <h1 className="text-white pl-16 pb-2">Event name : {creds}</h1>
        <form className="flex flex-wrap justify-center" onSubmit={handleSubmit}>
          <div className="mb-4 mx-8 w-1/3">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-white"
            >
              First Name
            </label>
            <input
              type="string"
              id="firstname"
              value={data.firstName}
              onChange={handleFirstName}
              className="mt-1 p-2 w-full bg-transparent border text-white rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 mx-8 w-1/3">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-white"
            >
              Last Name
            </label>
            <input
              type="string"
              id="lastname"
              value={data.lastName}
              onChange={handleLastName}
              className="mt-1 p-2 w-full bg-transparent border text-white rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 mx-8 w-1/3">
            <label
              htmlFor="phonenumber"
              className="block text-sm font-medium text-white"
            >
              Phone Number
            </label>
            <input
              type="string"
              id="phonenumber"
              value={data.phoneNumber}
              onChange={handleNumber}
              className="mt-1 p-2 w-full bg-transparent border text-white rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 mx-8 w-1/3">
            <label
              htmlFor="address1"
              className="block text-sm font-medium text-white"
            >
              Address Line 1
            </label>
            <input
              type="string"
              id="address1"
              value={data.address1}
              onChange={handleAddress1}
              className="mt-1 p-2 w-full bg-transparent border text-white rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 mx-8 w-1/3">
            <label
              htmlFor="address2"
              className="block text-sm font-medium text-white"
            >
              Address Line 2
            </label>
            <input
              type="string"
              id="address2"
              value={data.address2}
              onChange={handleAddress2}
              className="mt-1 p-2 w-full bg-transparent border text-white rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 mx-8 w-1/3">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-white"
            >
              City
            </label>
            <input
              type="string"
              id="city"
              value={data.city}
              onChange={handleCity}
              className="mt-1 p-2 w-full bg-transparent border text-white rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 mx-8 w-1/3">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-white"
            >
              State
            </label>
            <input
              type="string"
              id="state"
              value={data.state}
              onChange={handleState}
              className="mt-1 p-2 w-full bg-transparent border text-white rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 mx-8 w-1/3">
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-white"
            >
              Pincode
            </label>
            <input
              type="string"
              id="pincode"
              value={data.pincode}
              onChange={handlePincode}
              className="mt-1 p-2 w-full bg-transparent border text-white rounded-md focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mx-40 mb-4 bg-transparent text-white p-2 mt-6 rounded-md hover:bg-blue-300 hover:text-black focus:outline-none focus:ring border"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Registration;
