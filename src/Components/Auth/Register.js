import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classes from './Auth.module.css';
import Button from '../Common/Button';
import { useNotification } from '../../Contexts/NotificationContext';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  rePasswordValidator,
} from '../../helpers/validators';
import { useAuth } from '../../Contexts/AuthContext';
import useFetch from '../../Hooks/useFetch';
import { AUTH_URL } from '../../helpers/constants';

const Register = () => {
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

  const { login } = useAuth();
  const { sendRequest, isLoading } = useFetch();

  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const httpConfig = {
    url: `${AUTH_URL}/register`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { email, name, password, rePassword },
  };

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || emailErr.status) {
      setEmailErr({ status: true, message: 'Invalid email address!' });
    }

    if (!name || nameErr.status) {
      setNameErr({
        status: true,
        message: 'Name with 3 or more characters required!',
      });
    }

    if (!password || passwordErr.status) {
      setPasswordErr({
        status: true,
        message: 'Password with 6 or more characters required!',
      });
    }

    if (!rePassword || rePasswordErr.status) {
      console.log('hi');
      setRePasswordErr({
        status: true,
        message: 'Repeat password does not match password!',
      });
      return;
    }

    try {
      const user = await sendRequest(httpConfig);
      login(user);
      navigate('/projects');
      openNotification('success', `Welcome ${user.name}.`);
    } catch (error) {
      openNotification('fail', error.message);
    }
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
            onChange={emailHandler}
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
            onChange={nameHandler}
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
            onChange={passwordHandler}
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
            onChange={rePasswordHandler}
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
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default Register;
