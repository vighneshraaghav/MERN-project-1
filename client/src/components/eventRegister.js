import React from 'react'
import { useNavigate } from 'react-router-dom'

function EventRegister(props) {

  const navigate = useNavigate();

  const handleRegisterClick = (eventName) => {
    navigate('registration',{state:{eventName: eventName}});
  };

  return (
    <div className='border rounded-xl p-2 my-2 mx-12'>
      <div className='grid grid-cols-4'>
        <h1 className='text-white'>{props.name}</h1>
        <h1 className='text-white'>{props.datetime}</h1>
        <h1 className='text-white'>{props.status}</h1>
        {props.status !== 'Registered' ? (
        <button className='text-white' onClick={()=>handleRegisterClick(props.name)}>Register</button>
      ) : (
        <div></div>
      )}
      </div>
    </div>
  )
}

export default EventRegister
