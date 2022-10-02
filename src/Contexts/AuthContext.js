import { createContext, useContext, useState } from 'react';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAuth = !!user;

  const login = (currUser) => {
    setUser(currUser);
    localStorage.setItem('project-tracker', JSON.stringify(currUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('project-tracker');
  };

  const value = {
    user,
    login,
    logout,
    isAuth,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
