import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
