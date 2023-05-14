import { NavLink } from 'react-router-dom';

import classes from './Nav.module.css';

import { useAuth } from '../../../Contexts/AuthContext';
import useFetch from '../../../Hooks/useFetch';
import { useNotification } from '../../../Contexts/NotificationContext';
import URL from '../../../environment';

import ThemeButton from '../ThemeButton';
import {
  defaultUserSVG,
  kanbanSVG,
  logoutSVG,
} from '../../../helpers/svgIcons';

const InnerNav = () => {
  const { sendRequest, isLoading, setIsLoading } = useFetch();

  const { user, logout, updateTheme } = useAuth();
  const { openNotification } = useNotification();

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

  return (
    <nav className={classes.nav}>
      <div className={classes.innerLinks}>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? `${classes.active} ${classes.link}` : classes.link
          }
          end
        >
          {kanbanSVG}
          Projects
        </NavLink>

        <div className={classes.userLinks}>
          <ThemeButton
            onClick={changeThemeHandler}
            isDark={user.isDark}
            isLoading={isLoading}
          />
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? `${classes.active} ${classes.link} ${classes.name}`
                : `${classes.link} ${classes.name}`
            }
          >
            {user.photo === 'default' && defaultUserSVG}
            {user.photo !== 'default' && (
              <img
                className={classes.photo}
                src={`${URL.PHOTO_URL}/${user.photo}`}
                alt="employee's mugshot"
              ></img>
            )}
            {user?.name}
          </NavLink>
          <p
            className={`${classes.link} ${classes.logout}`}
            onClick={logoutHandler}
          >
            {logoutSVG}
            Logout
          </p>
        </div>
      </div>
    </nav>
  );
};

export default InnerNav;
