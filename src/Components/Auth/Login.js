import { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './Auth.module.css';
import Button from '../Common/Button';
import { useNotification } from '../../Contexts/NotificationContext';
import { emailValidator, passwordValidator } from '../../helpers/validators';

const Login = () => {
  const { openNotification } = useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErr, setEmailErr] = useState({
    status: false,
    message: '',
  });
  const [passwordErr, setPasswordErr] = useState({
    status: false,
    message: '',
  });

  const emailHandler = (e) => {
    const email = e.target.value.trim();
    setEmailErr(emailValidator(email));
    setEmail(email);
  };

  const passwordHandler = (e) => {
    const password = e.target.value.trim();
    setPasswordErr(passwordValidator(password));
    setPassword(password);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('submitted');
    openNotification('success', 'Logged in sucessfully!');
    console.log(email, password);
  };

  return (
    <>
      <form className={classes.form}>
        <div className={`${classes.inputGroup} mb-24`}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" onBlur={emailHandler} />
          {emailErr && (
            <p className={classes.errorMessage}>{emailErr.message}</p>
          )}
        </div>

        <div className={`${classes.inputGroup} mb-24`}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            onBlur={passwordHandler}
          />
          {passwordErr && (
            <p className={classes.errorMessage}>{passwordErr.message}</p>
          )}
        </div>

        <div className={`${classes.linkGroup} mb-32`}>
          <p>Don't have an account?</p>
          <Link
            to="/register"
            className={`${classes.link} ${classes.orangeLink}`}
          >
            Register&nbsp;<ion-icon name="arrow-round-forward"></ion-icon>
          </Link>
        </div>

        <Button
          text="Log in"
          type="submit"
          color="violet"
          onClickHandler={onSubmitHandler}
        />
      </form>
    </>
  );
};

export default Login;
