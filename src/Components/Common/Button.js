import classes from './Button.module.css';

const Button = ({ type, color, onClick, isLoading, helperClass, children }) => {
  const typeBtn = type || 'button';

  const orangeBtn = `${classes.btn} ${classes.orangeBtn}`;
  const violetBtn = `${classes.btn} ${classes.violetBtn}`;
  const greenBtn = `${classes.btn} ${classes.greenBtn}`;
  const greyBtn = `${classes.btn} ${classes.greyBtn}`;

  let className;

  switch (color) {
    case 'orange':
      className = orangeBtn;
      break;
    case 'violet':
      className = violetBtn;
      break;
    case 'green':
      className = greenBtn;
      break;
    case 'grey':
      className = greyBtn;
      break;
    default:
      className = violetBtn;
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
