import { Outlet, Navigate } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';

const GuestGuard = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default GuestGuard;
