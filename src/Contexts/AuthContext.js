import { createContext, useContext, useEffect, useState } from 'react';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const pastUser = JSON.parse(localStorage.getItem('project-tracker'));

  const [user, setUser] = useState(pastUser);
  const [isLocal, setIsLocal] = useState(
    pastUser !== null ? !pastUser.hasOwnProperty('token') : true
  );

  const isAuth = !!user;

  const login = (currUser, isLocal) => {
    setUser(currUser);
    setIsLocal(isLocal);
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

  const updateTheme = (isDark) => {
    setUser((prevState) => {
      return { ...prevState, isDark: isDark };
    });
  };

  const value = {
    user,
    isAuth,
    isLocal,
    login,
    logout,
    updatePhoto,
    updateTheme,
  };

  useEffect(() => {
    if (!user) {
      localStorage.removeItem('project-tracker');
      return;
    }

    localStorage.setItem('project-tracker', JSON.stringify(user));
  }, [user]);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
