import { Link, useLocation } from 'react-router-dom';

import classes from './Nav.module.css';

import { useAuth } from '../../../Contexts/AuthContext';

import OuterNav from './OuterNav';
import InnerNav from './InnerNav';

const Nav = () => {
  const location = useLocation();

  const { isAuth } = useAuth();

  const backNav = (
    <nav className={classes.nav}>
      <Link to="/" className={classes.link}>
        <ion-icon name="arrow-round-back"></ion-icon>
        Back
      </Link>
    </nav>
  );

  return (
    <>
      {isAuth && <InnerNav />}
      {(location.pathname === '/login' || location.pathname === '/register') &&
        backNav}
      {location.pathname === '/' && <OuterNav />}
    </>
  );
};

export default Nav;
