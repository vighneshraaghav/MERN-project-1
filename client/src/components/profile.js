import { useContext } from "react";
import { UserContext } from "../context/userContext";

function Profile() {
  const { user } = useContext(UserContext);
  
  if (!user) {
    return(<p>Loading</p>);
  }else{
    return (
      <div className="rounded-xl bg-purple-300 p-2 m-2">
        <h1 className="rounded-xl bg-white p-2 m-2">Welcome {user.name}</h1>
        <h1 className="rounded-xl bg-white p-2 m-2">
          This is your mail ID : {user.email}
        </h1>
      </div>
    );
  }
}

export default Profile;
