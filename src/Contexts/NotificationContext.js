import { createContext, useContext, useState } from 'react';

const notificationContext = createContext();

const defaultSettings = {
  isOpen: false,
  status: 'fail',
  message: '',
};

export const NotificationProvider = ({ children }) => {
  const [notificationSettings, setNotificationSettings] =
    useState(defaultSettings);

  const openNotification = (status, message) => {
    setNotificationSettings({ isOpen: true, status, message });
    setTimeout(() => {
      setNotificationSettings((prevState) => {
        return { ...prevState, isOpen: false };
      });
    }, 2000);
  };

  const value = { notificationSettings, openNotification };

  return (
    <notificationContext.Provider value={value}>
      {children}
    </notificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(notificationContext);
};
