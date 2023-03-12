import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocalStorage } from './useLocalStorage';
import axios from 'axios';



export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/login/success", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(response.data.user);
        setItem('user', JSON.stringify(response.data.user));
      } else {
        throw new Error("Authentication has failed.");
      }
    } catch (err) {
      console.log(err);
    }
  };


  const removeUser = () => {
    setUser(null);
    setItem('user', '');
  };
  return { user };

  // return { user, login, logout };
};