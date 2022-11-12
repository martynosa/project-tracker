import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './Auth.module.css';
import Button from '../Common/Button';

import InputGroup from '../Common/InputGroup';
import AuthLink from './AuthLink';
import {
  defaultErr,
  emailValidator,
  nameValidator,
  passwordValidator,
  rePasswordValidator,
} from '../../helpers/validators';

import { useNotification } from '../../Contexts/NotificationContext';
import { useAuth } from '../../Contexts/AuthContext';
import { AUTH_URL } from '../../helpers/constants';
import useFetch from '../../Hooks/useFetch';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [emailErr, setEmailErr] = useState(defaultErr);
  const [passwordErr, setPasswordErr] = useState(defaultErr);
  const [nameErr, setNameErr] = useState(defaultErr);
  const [rePasswordErr, setRePasswordErr] = useState(defaultErr);

  const { login } = useAuth();
  const { sendRequest, isLoading, setIsLoading } = useFetch();

  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const httpConfig = {
    url: `${AUTH_URL}/register`,
    method: 'POST',
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
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <InputGroup
          label={'email'}
          onChangeHandler={emailHandler}
          error={emailErr}
          value={email}
        />

        <InputGroup
          label={'name'}
          onChangeHandler={nameHandler}
          error={nameErr}
          value={name}
        />

        <InputGroup
          label={'password'}
          type={'password'}
          onChangeHandler={passwordHandler}
          error={passwordErr}
          value={password}
        />

        <InputGroup
          label={'repeat password'}
          type={'password'}
          onChangeHandler={rePasswordHandler}
          error={rePasswordErr}
          value={rePassword}
        />

        <AuthLink to={'login'} />

        <Button type={'submit'} color="orange" isLoading={isLoading}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
