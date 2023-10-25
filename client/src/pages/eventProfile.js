import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function EventProfile() {
  const [event, setEvent] = useState(null);
  const location = useLocation();
  const user = location.state.user;
  useEffect(() => {
    if (user) {
      const getEvent = async () => {
        try {
          const result = await axios.get(`/getevent/${user.email}`);
          setEvent(result.data);
          console.log(result.data);
        } catch (error) {
          console.error("Error loading event details:", error);
        }
      };
      getEvent();
    }
  }, [user]);

   if (event) {
    return (
      <div className="grid grid-cols-2">
        <div className="m-8 rounded-md border backdrop-blur">
          <h1 className="text-white m-4 underline text-2xl">User Information</h1>
          <h2 className="text-white m-4">
            Name : {event.personalDetails?.firstName}{" "}
            {event.personalDetails?.lastName}
          </h2>
          <h2 className="text-white m-4">Email : {event.email}</h2>
          <h2 className="text-white m-4">
            Phone Number : {event.personalDetails?.phoneNumber}{" "}
          </h2>
          <h2 className="text-white m-4">
            Address : <br />
            {event.personalDetails?.address1}
            <br />
            {event.personalDetails?.address2}
          </h2>
          <h2 className="text-white m-4">
            City : {event.personalDetails?.city}
          </h2>
          <h2 className="text-white m-4">
            State : {event.personalDetails?.state}
          </h2>
          <h2 className="text-white m-4">
            Pincode : {event.personalDetails?.pincode}
          </h2>
        </div>
        <div className="m-8 rounded-md border backdrop-blur">
          <h1 className="text-white m-4 underline text-2xl">Events Registered</h1>
          {event.events?.map((topic, index)=>(
            <div key={index}>
            <li className="text-white m-4">{topic.eventName}</li>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-white m-4">
        Loading..
      </div>
    );
  }
}

export default EventProfile;
