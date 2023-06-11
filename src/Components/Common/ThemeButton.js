import classes from './ThemeButton.module.css';

import { sunSVG, moonSVG } from '../../helpers/svgIcons';

const ThemeButton = ({ onClick, isDark, isLoading }) => {
  let className = `${classes.themeButton}`;
  let icon = isDark ? sunSVG : moonSVG;

  if (isDark) {
    className = `${classes.themeButton} ${classes.isDark}`;
  }

  if (isLoading) {
    className = `${classes.themeButton} ${classes.isLoading}`;
  }

  return (
    <button className={className} onClick={onClick}>
      {icon}
    </button>
  );
};
export default ThemeButton;
