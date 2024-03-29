import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './Auth.module.css';
import Button from '../Common/Button';
import InputGroup from '../Common/InputGroup';
import AuthLink from './AuthLink';
import PageTitle from '../Common/PageTitle';

import {
  defaultErr,
  emailValidator,
  lengthValidator,
} from '../../helpers/validators';

import { useNotification } from '../../Contexts/NotificationContext';
import { useAuth } from '../../Contexts/AuthContext';
import URL from '../../environment';
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

  const emailHandler = (e) => {
    const email = e.target.value.trim().toLowerCase();
    setEmailErr(emailValidator(email));
    setEmail(email);
  };

  const passwordHandler = (e) => {
    const password = e.target.value.trim();
    setPasswordErr(lengthValidator(password, 6));
    setPassword(password);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const emailValidationErr = emailValidator(email);
    const passwordValidationErr = lengthValidator(password, 6);
    setEmailErr(emailValidationErr);
    setPasswordErr(passwordValidationErr);

    if (emailValidationErr.status || passwordValidationErr.status) return;

    try {
      const user = await sendRequest({
        url: `${URL.AUTH_URL}/login`,
        method: 'POST',
        body: { email, password },
      });
      login(user, false);
      navigate('/projects');
      openNotification('success', `Welcome ${user.name}.`);
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  return (
    <div className={classes.container}>
      <PageTitle color={'violet'}>login</PageTitle>
      <form onSubmit={onSubmitHandler}>
        <InputGroup
          label={'email'}
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

        <Button type={'submit'} color="violet" isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
