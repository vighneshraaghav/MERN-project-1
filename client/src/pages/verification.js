import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { authActions } from '../store/authSlice';
import { useDispatch } from "react-redux";

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const creds = location.state;
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const verify = async () => {
      try {
        const result = await axios.get(`/verified/${creds.email}`);
        setData(result.data.user);
      } catch (error) {
        if(!creds){
          console.log("NULL")
        }else{
          console.log("Error:", error);
        }
      }
    };

    verify();
  }, [creds]);
  if (data) {
    const login = async (email, password) => {
      try {
        const userData = await axios.post("/login", {
          email,
          password,
        });
        if (userData.error) {
          toast.error(userData.error);
        } else {
          if (userData.data.error) {
            toast.error(userData.data.error);
          } else {
            setData({
              email: "",
              password: "",
            });
            dispatch(authActions.login());
            navigate("/profile");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    try {
      if (data.verified === true) {
        login(creds.email, creds.password);
      } else {
        return (
          <div>
            <h1>Verification mail sent for {creds.email}</h1>
          </div>
        );
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    return (
      <div>
        <h1>This page is not accessible..!</h1>
      </div>
    );
  }
};

export default Verification;
