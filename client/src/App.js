import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import Announcement from "./pages/announcement";
import Programme from "./pages/programme";
import Profile from "./pages/Profile";
import Home from "./pages/home";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";
import Verification from "./pages/verification";
import Verified from "./pages/verified";
import ProtectedRoutes from "./ProtectedRoutes";
import ForgotPwd from "./pages/forgotPwd";
import ResetPwd from "./pages/resetPwd";
import background from "./images/bg.jpg";

axios.defaults.baseURL = "http://localhost:5050";
axios.defaults.withCredentials = true;

function App() {
  const containerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  };
  return (
      <div className="h-screen bg-fixed overflow-y-scroll bg-purple-300" style={containerStyle}>
        <UserContextProvider>
          <Header />
          <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="announcements" element={<Announcement />} />
            <Route path="programme" element={<Programme />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="profile" element={<Profile />} />
              <Route
                path="/verifyUser/:userId/:uniqueString"
                element={<Verified />}
              />
              <Route path="verification" element={<Verification />} />
            </Route>
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="forgot-password" element={<ForgotPwd/>}/>
            <Route
                path="/reset-password/:id/:token"
                element={<ResetPwd />}
              />
            <Route path="*" element={<p>404 Not found</p>} />
          </Routes>
        </UserContextProvider>
      </div>
  );
}

export default App;
