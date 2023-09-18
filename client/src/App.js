import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from './components/header'
import SignInPage from './components/signin';
import SignUpPage from './components/signup';
import Announcement from './components/announcement';
import Profile from './components/profile';
import Home from './components/home';
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from './context/userContext';
import Verification from './components/verification';
import Verified from './components/verified';

axios.defaults.baseURL = 'http://localhost:5050';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className='h-screen bg-purple-200 '>
      <UserContextProvider>
      <Header/>
      <Toaster position='bottom-right' toastOptions={{duration:2000}}/>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="announcements" element={<Announcement />} />
        <Route path="profile" element={<Profile />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage/>} />
        <Route path="/verifyUser/:userId/:uniqueString" element={<Verified/>}/>
        <Route path="verification" element={<Verification/>}/>
        <Route path="*" element={<p>404 Not found</p>} />
      </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App