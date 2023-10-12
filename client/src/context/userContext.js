import axios from 'axios';
import {createContext, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
export const UserContext = createContext({})

export function UserContextProvider({children}){
  const [user, setUser] = useState(null);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  useEffect((user)=>{
    if(isLoggedIn){
      if(!user){
        axios.get('/profile').then(({data})=>{
          setUser(data)
        })
      }
    }
    else{
      setUser(null)
    }
  },[isLoggedIn])
  return(
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}