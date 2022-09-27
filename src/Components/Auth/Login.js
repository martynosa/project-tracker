import { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './Auth.module.css';
import Button from '../Common/Button';
import { emailValidator, passwordValidator } from '../../helpers/validators';

// test
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

  // test
  const [data, setData] = useState(null);
  const httpConfig = {
    url: `${AUTH_URL}/login`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { email, password },
  };

  const { sendRequest, isLoading } = useFetch();

  const consumeData = (data) => {
    setData(data);
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
    console.log('submitted');
    await sendRequest(httpConfig, consumeData, 'Logged in successfully!');
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
