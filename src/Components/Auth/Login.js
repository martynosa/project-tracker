import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classes from './Auth.module.css';
import Button from '../Common/Button';
import { useNotification } from '../../Contexts/NotificationContext';
import { emailValidator, passwordValidator } from '../../helpers/validators';

import { useAuth } from '../../Contexts/AuthContext';
import { AUTH_URL } from '../../helpers/constants';
import useFetch from '../../Hooks/useFetch';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [emailErr, setEmailErr] = useState({
    status: false,
    message: null,
  });
  const [passwordErr, setPasswordErr] = useState({
    status: false,
    message: null,
  });

  const { login } = useAuth();
  const { sendRequest, isLoading } = useFetch();

  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const httpConfig = {
    url: `${AUTH_URL}/login`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { email, password },
  };

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

  const onLoginHandler = async (e) => {
    e.preventDefault();

    const emailValidationErr = emailValidator(email);
    const passwordValidationErr = passwordValidator(password);
    setEmailErr(emailValidationErr);
    setPasswordErr(passwordValidationErr);

    if (emailValidationErr.status || passwordValidationErr.status) return;

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
          onClickHandler={onLoginHandler}
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default Login;
