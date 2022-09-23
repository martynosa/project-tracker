import classes from './Button.module.css';

const Button = ({ text, type, color, onClickHandler }) => {
  const orangeBtn = `${classes.btn} ${classes.orangeBtn}`;
  const violetBtn = `${classes.btn} ${classes.violetBtn}`;

  let className;

  switch (color) {
    case 'orange':
      className = orangeBtn;
      break;
    case 'violet':
      className = violetBtn;
      break;
    default:
      className = violetBtn;
  }

  return (
    <button type={type} className={className} onClick={onClickHandler}>
      {text}
    </button>
  );
};

export default Button;
