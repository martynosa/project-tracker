import classes from './ThemeButton.module.css';

const ThemeButton = ({ onClick, isDark, isLoading }) => {
  let className = `${classes.themeButton}`;
  let icon = <ion-icon name="moon"></ion-icon>;

  if (isDark) {
    className = `${classes.themeButton} ${classes.isDark}`;
    icon = <ion-icon name="sunny"></ion-icon>;
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
