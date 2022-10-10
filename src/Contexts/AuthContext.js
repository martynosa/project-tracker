import { createContext, useContext, useState } from 'react';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const pastUser = localStorage.getItem('project-tracker');
  const [user, setUser] = useState(JSON.parse(pastUser));

  const isAuth = !!user;

  const login = (currUser) => {
    setUser(currUser);
    localStorage.setItem('project-tracker', JSON.stringify(currUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('project-tracker');
  };

  const updatePhoto = (photoUrl) => {
    setUser((prevState) => {
      return { ...prevState, photo: photoUrl };
    });
  };

  const value = {
    user,
    isAuth,
    login,
    logout,
    updatePhoto,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
