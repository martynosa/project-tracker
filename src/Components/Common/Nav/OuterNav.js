import classes from './Nav.module.css';

import { useTheme } from '../../../Contexts/ThemeContext';

import ThemeButton from '../ThemeButton';
import { linkedinSVG, githubSVG } from '../../../helpers/svgIcons';

const OuterNav = () => {
  const { isDark, toggleOfflineTheme } = useTheme();

  return (
    <nav className={classes.nav}>
      <div className={classes.externalLinks}>
        <a
          className={classes.link}
          href="https://www.linkedin.com/in/martynosa/"
          target="_blank"
          rel="noreferrer"
        >
          {linkedinSVG}
          LinkedIn
        </a>
        <a
          className={classes.link}
          href="https://github.com/martynosa/"
          target="_blank"
          rel="noreferrer"
        >
          {githubSVG}
          Github
        </a>

        <div className={`${classes.link} ${classes.theme}`}>
          <ThemeButton onClick={toggleOfflineTheme} isDark={isDark} />
        </div>
      </div>
    </nav>
  );
};

export default OuterNav;
