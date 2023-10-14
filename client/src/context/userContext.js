import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const getContext = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get('/profile');
          console.log(response);
          setUser(response.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setUser(null);
      }
    };
    getContext();
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
