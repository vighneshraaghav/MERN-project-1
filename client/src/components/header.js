import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usericon from "../images/usericon.png";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <div className="px-2 py-4">
      <div className="flex flex-col sm:flex-row">
        <p className="p-1 text-white text-center m-auto">Tech-23</p>
        <div className="flex mx-11 flex-wrap lg:space-x-20 justify-center sm:justify-start gap-2">
          <Elements name="Home" link="/" />
          <Elements name="Announcements" link="/announcements" />
          <Elements name="Programme" link="/programme" />
          <Elements name="Speakers" />
          {isLoggedIn ? (
            <UserProfile />
          ) : (
            <Elements name="Login" link="/signin" />
          )}
        </div>
      </div>
    </div>
  );

  async function Logout() {
    await axios
      .get("logout")
      .then(dispatch(authActions.logout()), navigate("signin"));
  }

  function UserProfile() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };

    return (
      <div className="pt-2 relative">
        <button onClick={toggleMenu}>
          <img className="w-5 bg-white rounded-2xl" src={usericon} alt="usericon" />
        </button>
        <div
          className={`lg:flex absolute ${
            isMenuOpen ? "block px-2" : "hidden"
          } bg-white rounded border shadow-md`}
        >
          {isMenuOpen && (
            <div className="lg:flex lg:flex-col">
              <ul>
                <button onClick={() => Logout()}>Logout</button>
              </ul>
              <ul>
                <button onClick={() => navigate("profile")}>Profile</button>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  function Elements(props) {
    return (
      <button
        onClick={() => {
          navigate(props.link);
        }}
        className="hover:bg-white hover:text-black text-white p-1 rounded-md text-center m-auto"
      >
        {props.name}
      </button>
    );
  }
}

export default Header;
