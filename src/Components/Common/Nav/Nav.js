import { useLocation } from 'react-router-dom';

import { useAuth } from '../../../Contexts/AuthContext';

import ExternalNav from './ExternalNav';
import BackNav from './BackNav';
import Hamburger from './Hamburger';

const Nav = () => {
  const location = useLocation();

  const { isAuth } = useAuth();

  return (
    <>
      {isAuth && <Hamburger />}
      {(location.pathname === '/login' ||
        location.pathname === '/register') && <BackNav />}
      {location.pathname === '/' && <ExternalNav />}
    </>
  );
};

export default Nav;
