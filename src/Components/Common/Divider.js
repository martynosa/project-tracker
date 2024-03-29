import classes from './Divider.module.css';

const Divider = ({ color }) => {
  let className = classes.divider;

  switch (color) {
    case 'blue':
      className = `${className} ${classes.blue}`;
      break;
    case 'orange':
      className = `${className} ${classes.orange}`;
      break;
    case 'green':
      className = `${className} ${classes.green}`;
      break;
    case 'violet':
      className = `${className} ${classes.violet}`;
      break;
    case 'loading':
      className = `${className} ${classes.loading}`;
      break;
    default:
      className = `${className} ${classes.violet}`;
  }

  return <div className={className}></div>;
};

export default Divider;
