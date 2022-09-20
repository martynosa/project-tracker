import { Link } from 'react-router-dom';

import classes from './Auth.module.css';

const Login = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <>
      <form className={classes.form}>
        <div className={`${classes.inputGroup} mb-12`}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
        </div>

        <div className={`${classes.inputGroup} mb-12`}>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" />
        </div>

        <div className={`${classes.linkGroup} mb-24`}>
          <p>Don't have an account?</p>
          <Link
            to="/register"
            className={`${classes.link} ${classes.yellowLink}`}
          >
            Register&nbsp;<ion-icon name="arrow-round-forward"></ion-icon>
          </Link>
        </div>

        <button
          type="submit"
          onClick={onSubmitHandler}
          className={`${classes.btn} ${classes.purpleBtn}`}
        >
          Log in
        </button>
      </form>
    </>
  );
};

export default Login;
