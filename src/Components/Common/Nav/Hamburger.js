import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import classes from './Nav.module.css';

import { useAuth } from '../../../Contexts/AuthContext';
import useFetch from '../../../Hooks/useFetch';
import { useNotification } from '../../../Contexts/NotificationContext';
import URL from '../../../environment';

import ThemeButton from '../ThemeButton';
import {
  largeCrossSVG,
  defaultUserSVG,
  hamburgerSVG,
} from '../../../helpers/svgIcons';

const Hamburger = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { sendRequest, isLoading, setIsLoading } = useFetch();

  const { user, logout, updateTheme } = useAuth();
  const { openNotification } = useNotification();

  const pathname = useLocation();

  const changeThemeHandler = async () => {
    try {
      const newTheme = await sendRequest({
        url: `${URL.AUTH_URL}/updateTheme`,
        method: 'PATCH',
        isAuthenticated: true,
        body: { isDark: !user.isDark },
      });
      updateTheme(newTheme);
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  const logoutHandler = () => {
    logout();
    openNotification('success', 'Logged out.');
  };

  useEffect(() => setIsMenuOpen(false), [pathname]);

  return (
    <>
      {!isMenuOpen && (
        <button
          className={classes.hamburgerBtn}
          onClick={() => setIsMenuOpen(true)}
        >
          {hamburgerSVG}
        </button>
      )}
      <nav
        className={
          !isMenuOpen
            ? `${classes.hamburger} ${classes.closed}`
            : `${classes.hamburger}`
        }
      >
        <div className={classes.whoAmI}>
          <div>
            {user.photo === 'default' && defaultUserSVG}
            {user.photo !== 'default' && (
              <img
                src={`${URL.PHOTO_URL}/${user.photo}`}
                alt="employee's mugshot"
              ></img>
            )}
            <p>{user?.name}</p>
          </div>
          <ThemeButton
            onClick={changeThemeHandler}
            isDark={user.isDark}
            isLoading={isLoading}
          />
        </div>

        <div className={classes.linksGroup}>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? `${classes.active} ${classes.link}` : classes.link
            }
            end
          >
            projects
          </NavLink>

          <NavLink
            to="/photo"
            className={({ isActive }) =>
              isActive ? `${classes.active} ${classes.link}` : classes.link
            }
            end
          >
            profile photo
          </NavLink>

          <NavLink
            to="/password"
            className={({ isActive }) =>
              isActive ? `${classes.active} ${classes.link}` : classes.link
            }
            end
          >
            password change
          </NavLink>

          <p
            className={`${classes.link} ${classes.logout}`}
            onClick={logoutHandler}
          >
            logout
          </p>
        </div>

        <button
          className={`${classes.hamburgerBtnClose}`}
          onClick={() => setIsMenuOpen(false)}
        >
          {largeCrossSVG}
        </button>
      </nav>
    </>
  );
};

export default Hamburger;
