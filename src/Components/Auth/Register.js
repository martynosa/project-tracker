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
import { AUTH_URL } from '../../helpers/constants';
import useFetch from '../../Hooks/useFetch';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [emailErr, setEmailErr] = useState({
    status: false,
    message: '',
  });
  const [passwordErr, setPasswordErr] = useState({
    status: false,
    message: '',
  });
  const [nameErr, setNameErr] = useState({ status: false, message: '' });
  const [rePasswordErr, setRePasswordErr] = useState({
    status: false,
    message: '',
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

  const onRegisterHandler = async (e) => {
    e.preventDefault();

    const emailValidationErr = emailValidator(email);
    const nameValidationErr = nameValidator(name);
    const passwordValidationErr = passwordValidator(password);
    const rePasswordValidationErr = rePasswordValidator(password, rePassword);
    setEmailErr(emailValidationErr);
    setNameErr(nameValidationErr);
    setPasswordErr(passwordValidationErr);
    setRePasswordErr(rePasswordValidationErr);

    if (
      emailValidationErr.status ||
      nameValidationErr.status ||
      passwordValidationErr.status ||
      rePasswordValidationErr.status
    )
      return;

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
          onClickHandler={onRegisterHandler}
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default Register;
