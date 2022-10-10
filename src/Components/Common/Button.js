import classes from './Button.module.css';

const Button = ({ text, type, color, onClickHandler, isLoading, helperClass }) => {
  const orangeBtn = `${classes.btn} ${classes.orangeBtn}`;
  const violetBtn = `${classes.btn} ${classes.violetBtn}`;
  const greenBtn = `${classes.btn} ${classes.greenBtn}`;

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
    default:
      className = violetBtn;
  }

  if (helperClass) className = `${className} ${helperClass}`;
  if (isLoading) className = `${className} ${classes.loading}`;

  return (
    <button
      type={type}
      className={className}
      onClick={onClickHandler}
      disabled={isLoading}
    >
      {text}
    </button>
  );
};

export default Button;
