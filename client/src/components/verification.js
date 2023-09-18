import React from 'react'
//import axios from 'axios'
import { useLocation } from 'react-router-dom';
const Verification = ()=> {
   const location = useLocation();
   const email =location.state;
  console.log(location.state);
  // // const {data} = await axios.get(
  // //   '/verified/:email')
  return (
    <div>
      <h1>Verification mail sent for {email}</h1>
    </div>
  )
}

export default Verification