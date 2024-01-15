import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const useAuth = () => {
  const { user, setUser, isLoading, setIsLoading } = useAuthContext();
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/auth/profile`, {
          withCredentials: true,
        });
        const { profile, message } = response.data;
        console.log(profile)
        if (profile) {
          setUser(profile);
        } else {
          setError(message);
        }
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const login = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const logout = async () => {
    window.location.href = `${API_URL}/auth/logout`;
  };

  return {
    user,
    error,
    isLoading,
    login,
    logout,
  };
};

export default useAuth;
