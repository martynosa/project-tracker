import { createContext, useContext, useState, useEffect } from 'react';

import { useAuth } from './AuthContext';
import changeTheme from '../helpers/themeService';

const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user } = useAuth();

  const [isDark, setIsDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const toggleOfflineTheme = () => setIsDark(!isDark);

  const value = {
    isDark,
    setIsDark,
    toggleOfflineTheme,
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
