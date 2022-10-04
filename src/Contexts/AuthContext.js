import { createContext, useContext, useState, useEffect } from 'react';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAuth = !!user;

  const login = (currUser) => {
    setUser(currUser);
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

  useEffect(() => {
    if (user) localStorage.setItem('project-tracker', JSON.stringify(user));
  }, [user]);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
