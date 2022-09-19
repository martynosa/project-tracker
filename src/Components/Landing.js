import { Link } from 'react-router-dom';

import classes from './Landing.module.css';

const Landing = () => {
  return (
    <>
      <h1>Landing</h1>

      <Link to="/login" className={classes.btn}>
        Login
      </Link>
      <Link to="/register" className={classes.btn}>
        Register
      </Link>
    </>
  );
};

export default Landing;
