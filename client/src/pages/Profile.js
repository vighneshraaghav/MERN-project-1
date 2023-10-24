import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";
import trash from "../images/trash.png";
import EventRegister from "../components/eventRegister";
import EventProfile from "./eventProfile";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useContext(UserContext);
  //console.log(user);
  const [role, setRole] = useState(null);
  const [eventDetail, setEventDetail] = useState(null);
  useEffect(() => {
    if (user) {
      const getUser = async () => {
        try {
          const deets = await axios.get(`/specificUser/${user.email}`);
          setRole(deets.data.userType);
          console.log(deets);
        } catch (error) {
          console.error("Error loading user information:", error);
        }
      };
  
      const getEvent = async () => {
        try {
          const result = await axios.get(`/getevent/${user.email}`);
          setEventDetail(result.data);
          console.log(result.data);
        } catch (error) {
          console.error("Error loading event details:", error);
        }
      };
  
      getUser();
      getEvent();
    }
  }, [user]);
  
  if (user && role) {
    if (eventDetail) {
      if (role === "admin") {
        return <Admin user={user} />;
      } else {
        if (role === "user") {
          return <User user={user} event={eventDetail} />;
        }
      }
    }
  } else {
    return <p className="text-xl text-center text-white p-2 m-2">Loading</p>;
  }
}

function User(props) {
  const user = props.user;
  const events = props.event.events;
  const eventExist = (name) => {
    if (!events) {
      return "Not Registered";
    } else {
      for (const element of events) {
        if (element.eventName === name) {
          return "Registered";
        }
      }
      return "Not Registered";
    }
  };
  return (
    <div className="rounded-xl p-2 m-2">
      <div>
        <h1 className="rounded-xl text-white p-2 m-2">Welcome {user.name}</h1>
        <h1 className="rounded-xl text-white p-2 m-2">
          Registered mail ID : {user.email}
        </h1>
      </div>
      <div>
        <h1 className="text-white p-4">EVENT DETAILS</h1>
        <div className="border rounded-xl p-2 my-2 mx-12">
          <div className="grid grid-cols-4">
            <h1 className="text-white">Event Name</h1>
            <h1 className="text-white">Date & Time</h1>
            <h1 className="text-white">Registration Status</h1>
          </div>
        </div>
        <EventRegister
          name="Crack the Code"
          datetime="222"
          status={
            eventExist("Crack the Code")
          }
        />
        <EventRegister
          name="Paper Presentation"
          datetime="222"
          status={
            eventExist("Paper Presentation")
          }
        />
      </div>
    </div>
  );
}

function Admin(props) {
  const user = props.user;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      await axios
        .get("/users")
        .then((data) => {
          setUsers(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getUsers();
  }, [users]);

  const deleteUser = async (_id) => {
    try {
      const del = await axios.post("/deleteUser", { _id });
      if (del.error) {
        toast.error("Unable to delete User");
      } else {
        toast.success("User deleted Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="rounded-xl mx-20 p-2 m-2">
        <h1 className="rounded-xl text-white p-2 m-2">
          Welcome Admin {user.name}
        </h1>
        <h1 className="rounded-xl text-white p-2 m-2">
          Your mail ID : {user.email}
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-lg p-6 border backdrop-blur rounded-lg shadow-md">
          <div className="grid grid-cols-3">
            <h1 className="rounded-xl underline text-white p-2 m-2">Name</h1>
            <h1 className="rounded-xl underline text-white p-2 m-2">
              Registered Email
            </h1>
            <h1 className="rounded-xl underline justify-self-end text-white p-2 m-2">
              Delete
            </h1>
          </div>
          {users.map((member, index) => (
            <button onClick={()=>navigate("/profile/eventprofile")} className="grid rounded-md hover:bg-blue-600 grid-cols-3" key={index}>
              <h1 className="justify-self-start rounded-xl text-white p-2 m-2">{member.name}</h1>
              <h1 className="justify-self-start rounded-xl text-white p-2 m-2">{member.email}</h1>
              <button
                className="p-2 m-2 justify-self-end"
                onClick={() => deleteUser(member._id)}
              >
                <img src={trash} alt="delete" />
              </button>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
