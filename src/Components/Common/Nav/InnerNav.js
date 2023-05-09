import { NavLink } from 'react-router-dom';

import classes from './Nav.module.css';

import { useAuth } from '../../../Contexts/AuthContext';
import { useTheme } from '../../../Contexts/ThemeContext';
import useFetch from '../../../Hooks/useFetch';
import { useNotification } from '../../../Contexts/NotificationContext';
import URL from '../../../environment';

import ThemeButton from '../ThemeButton';
import {
  defaultUserSVG,
  kanbanSVG,
  localUserSVG,
} from '../../../helpers/svgIcons';

const InnerNav = () => {
  const { user, isLocal, logout, updateTheme } = useAuth();
  const { isDark, toggleOfflineTheme } = useTheme();
  const { sendRequest, isLoading, setIsLoading } = useFetch();
  const { openNotification } = useNotification();

  const changeThemeHandler = async () => {
    if (isLocal) {
      updateTheme(!isDark);
      toggleOfflineTheme();
      return;
    }

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
            {isLocal && localUserSVG}
            {user.profilePhoto === 'default' && defaultUserSVG}
            {!isLocal && user.profilePhoto !== 'default' && (
              <img
                className={classes.photo}
                src={`${URL.PHOTO_URL}/${user?.photo}`}
                alt="employee's mugshot"
              ></img>
            )}
            {user?.name}
          </NavLink>
          <p
            className={`${classes.link} ${classes.logout}`}
            onClick={logoutHandler}
          >
            Logout
          </p>
        </div>
      </div>
    </nav>
  );
};

export default InnerNav;
