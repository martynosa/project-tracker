import { NavLink, Link, useLocation } from 'react-router-dom';

import classes from './Nav.module.css';
import { useNotification } from '../../Contexts/NotificationContext';
import { useAuth } from '../../Contexts/AuthContext';
import { PHOTO_URL } from '../../helpers/constants';

const Nav = () => {
  const location = useLocation();

  const { openNotification } = useNotification();
  const { user, isAuth, logout } = useAuth();

  const onLogoutHandler = () => {
    logout();
    openNotification('success', `Logged out successfully`);
  };

  const backNav = (
    <nav className={classes.outerNav}>
      <Link to="/" className={classes.link}>
        <ion-icon name="arrow-round-back"></ion-icon>
        Back
      </Link>
    </nav>
  );

  const innerNav = (
    <nav className={classes.innerNav}>
      <div className={classes.innerLinks}>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? `${classes.active} ${classes.link}` : classes.link
          }
          end
        >
          Projects
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive ? `${classes.active} ${classes.link}` : classes.link
          }
        >
          Create project
        </NavLink>
      </div>

      <div className={classes.userLinks}>
        <img
          className={classes.photo}
          src={`${PHOTO_URL}/${user?.photo}`}
          alt="employee's mugshot"
        ></img>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? `${classes.active} ${classes.link} ${classes.name}`
              : `${classes.link} ${classes.name}`
          }
        >
          {user?.name}
        </NavLink>
        <p
          className={`${classes.link} ${classes.logout}`}
          onClick={onLogoutHandler}
        >
          Logout
        </p>
      </div>
    </nav>
  );

  const outerNav = (
    <nav className={classes.outerNav}>
      <a
        className={classes.link}
        href="https://www.linkedin.com/in/martynosa/"
        target="_blank"
        rel="noreferrer"
      >
        <ion-icon name="logo-linkedin"></ion-icon>
        LinkedIn
      </a>
      <a
        className={classes.link}
        href="https://github.com/martynosa/"
        target="_blank"
        rel="noreferrer"
      >
        <ion-icon name="logo-github"></ion-icon>
        Github
      </a>
      <a
        className={classes.link}
        href="https://martynosa-react-weather.netlify.app/"
        target="_blank"
        rel="noreferrer"
      >
        <ion-icon name="partly-sunny"></ion-icon>
        Weather
      </a>
      <a
        className={classes.link}
        href="https://martynosa-sharingan.netlify.app/"
        target="_blank"
        rel="noreferrer"
      >
        <ion-icon name="eye"></ion-icon>
        Sharingan
      </a>
      <a
        className={classes.link}
        href="https://martynosa-omnifood.netlify.app/"
        target="_blank"
        rel="noreferrer"
      >
        <ion-icon name="pizza"></ion-icon>
        Omnifood
      </a>
    </nav>
  );

  return (
    <>
      {isAuth && innerNav}
      {(location.pathname === '/login' || location.pathname === '/register') &&
        backNav}
      {location.pathname === '/' && outerNav}
    </>
  );
};

export default Nav;
