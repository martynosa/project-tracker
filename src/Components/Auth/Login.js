import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classes from './Auth.module.css';
import Button from '../Common/Button';
import { emailValidator, passwordValidator } from '../../helpers/validators';

import { AUTH_URL } from '../../helpers/constants';
import useFetch from '../../Hooks/useFetch';
import { useAuth } from '../../Contexts/AuthContext';
import { useNotification } from '../../Contexts/NotificationContext';

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || emailErr.status) {
      setEmailErr({ status: true, message: `Invalid email address!` });
    }

    if (!password || passwordErr.status) {
      setPasswordErr({
        status: true,
        message: 'Password with 6 or more characters required!',
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
            onBlur={emailHandler}
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
            onBlur={passwordHandler}
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
          onClickHandler={onSubmitHandler}
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default Login;
