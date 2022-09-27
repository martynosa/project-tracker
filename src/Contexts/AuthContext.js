import { createContext, useContext, useState } from 'react';

const authContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAuth = !!user.email;

  const value = {
    user,
    setUser,
    isAuth,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
