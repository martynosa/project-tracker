import { Link } from 'react-router-dom';

import classes from './Auth.module.css';
import Button from '../Common/Button';

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
          <Link to="/login" className={`${classes.link} ${classes.violetLink}`}>
            <ion-icon name="arrow-round-back"></ion-icon>&nbsp;Login
          </Link>
        </div>

        <Button
          text="Register"
          type="submit"
          color="orange"
          onClickHandler={onSubmitHandler}
        />
      </form>
    </>
  );
};

export default Register;
