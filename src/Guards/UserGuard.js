import { Outlet, Navigate } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';

const UserGuard = () => {
  const { isAuth } = useAuth();

  return !isAuth ? <Outlet /> : <Navigate to="/projects" />;
};

export default UserGuard;
