import { Link } from 'react-router-dom';

import classes from './AuthLink.module.css';

const AuthLink = ({ to }) => {
  const toLogin = (
    <>
      <p>Already have an account?</p>
      <Link to="/login" className={`${classes.link} ${classes.violetLink}`}>
        <ion-icon name="arrow-round-back"></ion-icon>&nbsp;Login
      </Link>
    </>
  );

  const toRegister = (
    <>
      <p>Don't have an account?</p>
      <Link to="/register" className={`${classes.link} ${classes.orangeLink}`}>
        Register&nbsp;<ion-icon name="arrow-round-forward"></ion-icon>
      </Link>
    </>
  );

  return (
    <div className={classes.linkGroup}>
      {to === 'login' && toLogin}
      {to === 'register' && toRegister}
    </div>
  );
};

export default AuthLink;
