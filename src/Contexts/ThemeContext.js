import { createContext, useContext, useState, useEffect } from 'react';

import { useAuth } from './AuthContext';
import changeTheme from '../helpers/themeService';

const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user } = useAuth();

  const [isDark, setIsDark] = useState(true);

  const value = {
    isDark,
    setIsDark,
  };

  useEffect(() => {
    !user ? changeTheme(isDark) : changeTheme(user.isDark);
  }, [isDark, user]);

  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(themeContext);
};
