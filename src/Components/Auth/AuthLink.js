import { Link } from 'react-router-dom';

import classes from './AuthLink.module.css';

import {
  arrowBackSVG,
  arrowForwardSVG,
  arrowUpRightSVG,
} from '../../helpers/svgIcons';

const AuthLink = ({ to }) => {
  const toLogin = (
    <>
      <p>Already have an account?</p>
      <Link to="/login" className={`${classes.link} ${classes.violetLink}`}>
        Login
        {arrowForwardSVG}
      </Link>
    </>
  );

  const toRegister = (
    <>
      <p>Don't have an account?</p>
      <Link to="/register" className={`${classes.link} ${classes.orangeLink}`}>
        {arrowBackSVG}
        Register
      </Link>
    </>
  );

  const toOnlineAccount = (
    <>
      <p>Use online?</p>
      <Link to="/register" className={`${classes.link} ${classes.orangeLink}`}>
        {arrowUpRightSVG}
        Get started
      </Link>
    </>
  );

  return (
    <div className={classes.linkGroup}>
      {to === 'login' && toLogin}
      {to === 'register' && toRegister}
      {to === 'online' && toOnlineAccount}
    </div>
  );
};

export default AuthLink;
