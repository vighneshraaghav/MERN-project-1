import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    const getContext = async() => {
      if (isLoggedIn) {
          await axios.get('/profile').then(({ data }) => {
            setUser(data);
          }).then(console.log("Done");).catch(err => console.log(err););
      }else{
        setUser(null);
      }
    }
    getContext();
  }, [isLoggedIn]); // Include 'user' as a dependency

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
