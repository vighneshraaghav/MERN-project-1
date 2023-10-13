import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";

function Profile() {
  const { user } = useContext(UserContext);
  const [role, setRole] = useState(null);
  useEffect(() => {
    if (user) {
      const getUser = async () => {
        await axios
          .get(`/specificUser/${user.email}`)
          .then((deets) => {
            setRole(deets.data.userType)
          })
          .catch(console.log("Loading user information"));
      };
      getUser();
    }
  }, [user]);
  if (user && role) {
    console.log(role);
    if (role === "admin") {
      return <Admin user={user} />;
    } else {
      if (role === "user") {
        return <User user={user} />;
      }
    }
  } else {
    return <p className="text-xl text-center text-white p-2 m-2">Loading</p>;
  }
}

function User(props) {
  const user = props.user;
  return (
    <div className="rounded-xl p-2 m-2">
      <h1 className="rounded-xl text-white p-2 m-2">Welcome {user.name}</h1>
      <h1 className="rounded-xl text-white p-2 m-2">
        Registered mail ID : {user.email}
      </h1>
    </div>
  );
}

function Admin(props) {
  const user = props.user;
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
  }, []);

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
      <div className="rounded-xl border backdrop-blur p-2 mx-24">
        <div className="grid grid-cols-2">
          <h1 className="rounded-xl underline text-white p-2 m-2">Name</h1>
          <h1 className="rounded-xl underline text-white p-2 m-2">Registered Email</h1>
        </div>
        {users.map((member) => (
          <div className="grid grid-cols-2">
            <h1 className="rounded-xl text-white p-2 m-2">{member.name}</h1>
            <h1 className="rounded-xl text-white p-2 m-2">{member.email}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
