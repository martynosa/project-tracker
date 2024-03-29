import classes from './Button.module.css';

const Button = ({ type, color, onClick, isLoading, children }) => {
  const typeBtn = type || 'button';

  let className = classes.btn;

  switch (color) {
    case 'orange':
      className = `${classes.btn} ${classes.orange}`;
      break;
    case 'green':
      className = `${classes.btn} ${classes.green}`;
      break;
    case 'violet':
      className = `${classes.btn} ${classes.violet}`;
      break;
    case 'red':
      className = `${classes.btn} ${classes.red}`;
      break;
    default:
      className = `${classes.btn} ${classes.violet}`;
  }

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
