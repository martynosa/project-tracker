import { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './Auth.module.css';
import Button from '../Common/Button';
import { useNotification } from '../../Contexts/NotificationContext';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  rePasswordValidator,
} from '../../helpers/validators';

const Register = () => {
  const { openNotification } = useNotification();

  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);

  const [emailErr, setEmailErr] = useState({
    status: false,
    message: null,
  });
  const [passwordErr, setPasswordErr] = useState({
    status: false,
    message: null,
  });
  const [nameErr, setNameErr] = useState({ status: false, message: null });
  const [rePasswordErr, setRePasswordErr] = useState({
    status: false,
    message: null,
  });

  const emailHandler = (e) => {
    const email = e.target.value.trim();
    setEmailErr(emailValidator(email));
    setEmail(email);
  };

  const nameHandler = (e) => {
    const name = e.target.value.trim();
    setNameErr(nameValidator(name));
    setName(name);
  };

  const passwordHandler = (e) => {
    const password = e.target.value.trim();
    setPasswordErr(passwordValidator(password));
    setPassword(password);
  };

  const rePasswordHandler = (e) => {
    const rePassword = e.target.value.trim();
    setRePasswordErr(rePasswordValidator(password, rePassword));
    setRePassword(rePassword);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('submitted');
    openNotification('success', 'Registered sucessfully!');
    console.log(email, name, password, rePassword);
  };

  return (
    <>
      <form className={classes.form}>
        <div className={`${classes.inputGroup} mb-24`}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onBlur={emailHandler}
            className={emailErr.status ? classes.errorInput : undefined}
          />
          {emailErr.status && (
            <p className={classes.errorMessage}>{emailErr.message}</p>
          )}
        </div>

        <div className={`${classes.inputGroup} mb-24`}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onBlur={nameHandler}
            className={nameErr.status ? classes.errorInput : undefined}
          />
          {nameErr.status && (
            <p className={classes.errorMessage}>{nameErr.message}</p>
          )}
        </div>

        <div className={`${classes.inputGroup} mb-24`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onBlur={passwordHandler}
            className={passwordErr.status ? classes.errorInput : undefined}
          />
          {passwordErr.status && (
            <p className={classes.errorMessage}>{passwordErr.message}</p>
          )}
        </div>

        <div className={`${classes.inputGroup} mb-24`}>
          <label htmlFor="rePassword">Repeat Password</label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            onBlur={rePasswordHandler}
            className={rePasswordErr.status ? classes.errorInput : undefined}
          />
          {rePasswordErr.status && (
            <p className={classes.errorMessage}>{rePasswordErr.message}</p>
          )}
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
