import classes from './Nav.module.css';

import { useTheme } from '../../../Contexts/ThemeContext';

import ThemeButton from '../ThemeButton';
import { linkedinSVG, githubSVG } from '../../../helpers/svgIcons';

const ExternalNav = () => {
  const { isDark, toggleOfflineTheme } = useTheme();

  return (
    <nav className={classes.nav}>
      <div className={classes.externalLinksGroup}>
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

        <ThemeButton onClick={toggleOfflineTheme} isDark={isDark} />
      </div>
    </nav>
  );
};

export default ExternalNav;
