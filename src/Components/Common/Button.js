import classes from './Button.module.css';

const Button = ({ type, color, onClick, isLoading, helperClass, children }) => {
  const typeBtn = type || 'button';

  let className = classes.btn;

  switch (color) {
    case 'orange':
      className = `${classes.btn} ${classes.orangeBtn}`;
      break;
    case 'green':
      className = `${classes.btn} ${classes.greenBtn}`;
      break;
    case 'violet':
      className = `${classes.btn} ${classes.violetBtn}`;
      break;
    case 'red':
      className = `${classes.btn} ${classes.redBtn}`;
      break;
    default:
      className = `${classes.btn} ${classes.violetBtn}`;
  }

  if (helperClass) className = `${className} ${helperClass}`;
  if (isLoading) className = `${className} ${classes.loading}`;

  return (
    <button
      type={typeBtn}
      className={className}
      onClick={onClick}
      disabled={isLoading}
    >
      {children}
    </button>
  );
};

export default Button;
