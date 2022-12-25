import classes from './Nav.module.css';

import { useTheme } from '../../../Contexts/ThemeContext';

import ThemeButton from '../ThemeButton';

const OuterNav = () => {
  const { isDark, setIsDark } = useTheme();

  const changeThemeHandler = () => {
    setIsDark(!isDark);
  };

  return (
    <nav className={`${classes.nav} ${classes.outer}`}>
      <div className={classes.externalLinks}>
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
        <div className={classes.theme}>
          <ThemeButton onClick={changeThemeHandler} isDark={isDark} />
        </div>
      </div>
    </nav>
  );
};

export default OuterNav;
