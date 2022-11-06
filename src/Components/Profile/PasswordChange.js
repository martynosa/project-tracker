import { useState } from 'react';

import classes from './PasswordChange.module.css';
import Button from '../Common/Button';

import InputGroup from '../Common/InputGroup';

import {
  passwordValidator,
  rePasswordValidator,
} from '../../helpers/validators';

import { useNotification } from '../../Contexts/NotificationContext';
import { AUTH_URL } from '../../helpers/constants';
import useFetch from '../../Hooks/useFetch';

const PasswordChange = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRePassword, setNewRePassword] = useState('');
  const [passwordErr, setPasswordErr] = useState({
    status: false,
    message: null,
  });
  const [newPasswordErr, setNewPasswordErr] = useState({
    status: false,
    message: null,
  });
  const [newRePasswordErr, setNewRePasswordErr] = useState({
    status: false,
    message: null,
  });

  const { sendRequest, isLoading, setIsLoading } = useFetch();

  const { openNotification } = useNotification();

  const passwordHandler = (e) => {
    const password = e.target.value.trim();
    setPasswordErr(passwordValidator(password));
    setPassword(password);
  };
  const newPasswordHandler = (e) => {
    const newPassword = e.target.value.trim();
    setNewPasswordErr(passwordValidator(newPassword));
    setNewPassword(newPassword);
  };
  const newRePasswordHandler = (e) => {
    const newRePassword = e.target.value.trim();
    setNewRePasswordErr(rePasswordValidator(newPassword, newRePassword));
    setNewRePassword(newRePassword);
  };

  const httpConfig = {
    url: `${AUTH_URL}/updatePassword`,
    method: 'PATCH',
    body: { password, newPassword, newRePassword },
    isAuthorized: true,
  };

  const onPasswordChangeHandler = async () => {
    const passwordValidationErr = passwordValidator(password);
    const newPasswordValidationErr = passwordValidator(newPassword);
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
      await sendRequest(httpConfig);
      setPassword('');
      setNewPassword('');
      setNewRePassword('');
      openNotification('success', 'Password updated sucessfully.');
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  return (
    <form className={classes.passwordForm}>
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

      <Button
        color="green"
        onClickHandler={onPasswordChangeHandler}
        isLoading={isLoading}
      >
        Change password
      </Button>
    </form>
  );
};

export default PasswordChange;
