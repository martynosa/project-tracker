import { Link } from 'react-router-dom';

import classes from './Auth.module.css';

const Register = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <>
      <form className={classes.form}>
        <div className={`${classes.inputGroup} mb-24`}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
        </div>

        <div className={`${classes.inputGroup} mb-24`}>
          <label htmlFor="fullName">Name</label>
          <input type="text" id="fullName" name="fullName" />
        </div>

        <div className={`${classes.inputGroup} mb-24`}>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" />
        </div>

        <div className={`${classes.inputGroup} mb-24`}>
          <label htmlFor="rePassword">Repeat Password</label>
          <input type="text" id="rePassword" name="rePassword" />
        </div>

        <div className={`${classes.linkGroup} mb-32`}>
          <p>Already have an account?</p>
          <Link to="/login" className={`${classes.link} ${classes.purpleLink}`}>
            <ion-icon name="arrow-round-back"></ion-icon>&nbsp;Login
          </Link>
        </div>

        <button
          type="submit"
          onClick={onSubmitHandler}
          className={`${classes.btn} ${classes.yellowBtn}`}
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
