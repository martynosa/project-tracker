import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './Auth.module.css';
import Button from '../Common/Button';
import InputGroup from '../Common/InputGroup';
import AuthLink from './AuthLink';
import {
  defaultErr,
  emailValidator,
  passwordValidator,
} from '../../helpers/validators';

import { useNotification } from '../../Contexts/NotificationContext';
import { useAuth } from '../../Contexts/AuthContext';
import { AUTH_URL } from '../../helpers/constants';
import useFetch from '../../Hooks/useFetch';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErr, setEmailErr] = useState(defaultErr);
  const [passwordErr, setPasswordErr] = useState(defaultErr);

  const { login } = useAuth();
  const { sendRequest, isLoading, setIsLoading } = useFetch();

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
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  return (
    <>
      <form className={classes.form}>
        <InputGroup
          label={'email'}
          type={'text'}
          onChangeHandler={emailHandler}
          error={emailErr}
          value={email}
        />

        <InputGroup
          label={'password'}
          type={'password'}
          onChangeHandler={passwordHandler}
          error={passwordErr}
          value={password}
        />

        <AuthLink to={'register'} />

        <Button
          type="submit"
          color="violet"
          onClickHandler={onLoginHandler}
          isLoading={isLoading}
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
