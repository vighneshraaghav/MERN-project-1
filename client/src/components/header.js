import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div className='bg-purple-100 px-2 py-4'>
      <div className='grid grid-cols-6'>
        <p className='p-1 text-center m-auto'>The Conference 2023</p>
        <Elements name='Home' link='/'/>
        <Elements name='Announcements' link='/announcements' />
        <Elements name='Programme'/>
        <Elements name='Speakers'/>
        {isLoggedIn?<button onClick={Logout}>Logout</button>:<Elements name='Login' link='/signin'/>}
      </div>
    </div>
  )

  async function Logout(){
    await axios.get('logout').then(
    window.localStorage.clear(),
    navigate('signin'))
  }
  function Elements(props){
    return(
      <button onClick={()=>{navigate(props.link)}} className='hover:bg-purple-300 p-1 rounded-md text-center m-auto'>{props.name}</button>
    )
  }
}

export default Header