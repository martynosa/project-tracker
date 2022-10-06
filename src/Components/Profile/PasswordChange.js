import { useState } from 'react';

import classes from './Profile.module.css';
import Button from '../Common/Button';

import { useNotification } from '../../Contexts/NotificationContext';
import {
  passwordValidator,
  rePasswordValidator,
} from '../../helpers/validators';

import { useAuth } from '../../Contexts/AuthContext';
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

  const { user } = useAuth();
  const { sendRequest, isLoading } = useFetch();

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
    headers: { 'Content-Type': 'application/json', token: user.token },
    body: { password, newPassword, newRePassword },
  };

  const onUpdatePasswordHandler = async (e) => {
    e.preventDefault();

    const passwordValidationErr = passwordValidator(password);
    const newPasswordValidationErr = passwordValidator(newPassword);
    const newRePasswordValidationErr = rePasswordValidator(
      newPassword,
      newRePassword
    );
    setPasswordErr(passwordValidationErr);
    setNewPasswordErr(newPasswordValidationErr);
    setNewRePasswordErr(newRePasswordValidationErr);

    if (passwordErr.status || newPasswordErr.status || newRePasswordErr.status)
      return;

    try {
      await sendRequest(httpConfig);
      setPassword('');
      setNewPassword('');
      setNewRePassword('');
      openNotification('success', 'Password updated sucessfully.');
    } catch (error) {
      openNotification('fail', error.message);
    }
  };

  return (
    <form className={`${classes.passwordForm} mt-48`}>
      <div className={`${classes.passwordInputGroup} mb-24`}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={passwordHandler}
          className={passwordErr.status ? classes.errorInput : undefined}
          value={password}
        />
        {passwordErr.status && (
          <p className={classes.errorMessage}>{passwordErr.message}</p>
        )}
      </div>
      <div className={`${classes.passwordInputGroup} mb-24`}>
        <label htmlFor="newPassword">New password</label>
        <input
          id="newPassword"
          type="password"
          onChange={newPasswordHandler}
          className={newPasswordErr.status ? classes.errorInput : undefined}
          value={newPassword}
        />
        {newPasswordErr.status && (
          <p className={classes.errorMessage}>{newPasswordErr.message}</p>
        )}
      </div>
      <div className={`${classes.passwordInputGroup} mb-24`}>
        <label htmlFor="newRePassword">Repeat new password</label>
        <input
          id="newRePassword"
          type="password"
          onChange={newRePasswordHandler}
          className={newRePasswordErr.status ? classes.errorInput : undefined}
          value={newRePassword}
        />
        {newRePasswordErr.status && (
          <p className={classes.errorMessage}>{newRePasswordErr.message}</p>
        )}
      </div>
      <Button
        text="Change password"
        type="submit"
        color="green"
        onClickHandler={onUpdatePasswordHandler}
        isLoading={isLoading}
      />
    </form>
  );
};

export default PasswordChange;
