import { useEffect } from 'react';
import { useUser } from './useUser';
import { useLocalStorage } from './useLocalStorage';
import axios from 'axios';
export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/login/success", {
        withCredentials: true,
      });

      if (response.status === 200) {
        addUser(response.data.user);
      } else {
        throw new Error("Authentication has failed.");
      }
    } catch (err) {
      console.log(err);
    }
  };


  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};