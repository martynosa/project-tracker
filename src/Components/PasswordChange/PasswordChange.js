import { useState } from 'react';

import classes from './PasswordChange.module.css';

import Button from '../Common/Button';
import InputGroup from '../Common/InputGroup';
import PageTitle from '../Common/PageTitle';

import {
  defaultErr,
  lengthValidator,
  rePasswordValidator,
} from '../../helpers/validators';

import { useNotification } from '../../Contexts/NotificationContext';
import URL from '../../environment';
import useFetch from '../../Hooks/useFetch';

const PasswordChange = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRePassword, setNewRePassword] = useState('');
  const [passwordErr, setPasswordErr] = useState(defaultErr);
  const [newPasswordErr, setNewPasswordErr] = useState(defaultErr);
  const [newRePasswordErr, setNewRePasswordErr] = useState(defaultErr);

  const { sendRequest, isLoading, setIsLoading } = useFetch();

  const { openNotification } = useNotification();

  const passwordHandler = (e) => {
    const password = e.target.value.trim();
    setPasswordErr(lengthValidator(password, 6));
    setPassword(password);
  };
  const newPasswordHandler = (e) => {
    const newPassword = e.target.value.trim();
    setNewPasswordErr(lengthValidator(newPassword, 6));
    setNewPassword(newPassword);
  };
  const newRePasswordHandler = (e) => {
    const newRePassword = e.target.value.trim();
    setNewRePasswordErr(rePasswordValidator(newPassword, newRePassword));
    setNewRePassword(newRePassword);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const passwordValidationErr = lengthValidator(password, 6);
    const newPasswordValidationErr = lengthValidator(newPassword, 6);
    const newRePasswordValidationErr = rePasswordValidator(
      newPassword,
      newRePassword
    );
    setPasswordErr(passwordValidationErr);
    setNewPasswordErr(newPasswordValidationErr);
    setNewRePasswordErr(newRePasswordValidationErr);

    if (
      passwordValidationErr.status ||
      newPasswordValidationErr.status ||
      newRePasswordValidationErr.status
    )
      return;

    try {
      await sendRequest({
        url: `${URL.AUTH_URL}/updatePassword`,
        method: 'PATCH',
        body: { password, newPassword, newRePassword },
        isAuthenticated: true,
      });
      setPassword('');
      setNewPassword('');
      setNewRePassword('');
      openNotification('success', 'Password updated.');
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  return (
    <section className={classes.container}>
      <PageTitle color={'orange'}>password change</PageTitle>

      <form className={classes.form} onSubmit={onSubmitHandler}>
        <InputGroup
          label={'password'}
          type={'password'}
          onChangeHandler={passwordHandler}
          error={passwordErr}
          value={password}
        />

        <InputGroup
          label={'new password'}
          type={'password'}
          onChangeHandler={newPasswordHandler}
          error={newPasswordErr}
          value={newPassword}
        />

        <InputGroup
          label={'repeat new password'}
          type={'password'}
          onChangeHandler={newRePasswordHandler}
          error={newRePasswordErr}
          value={newRePassword}
        />

        <Button type={'submit'} color="orange" isLoading={isLoading}>
          Change password
        </Button>
      </form>
    </section>
  );
};

export default PasswordChange;
