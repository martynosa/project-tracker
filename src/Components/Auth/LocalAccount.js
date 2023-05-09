import { useState } from 'react';

import classes from './Auth.module.css';
import Divider from '../Common/Divider';
import InputGroup from '../Common/InputGroup';
import Button from '../Common/Button';
import AuthLink from './AuthLink';
import { defaultErr } from '../../helpers/validators';
import { lengthValidator } from '../../helpers/validators';

import { useAuth } from '../../Contexts/AuthContext';

const LocalAccount = () => {
  const [name, setName] = useState('');

  const [nameErr, setNameErr] = useState(defaultErr);

  const { login } = useAuth();

  const nameHandler = (e) => {
    const name = e.target.value.trim().toLowerCase();
    setNameErr(lengthValidator(name, 3));
    setName(name);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const nameValidationErr = lengthValidator(name, 3);
    setNameErr(nameValidationErr);

    if (nameValidationErr.status) return;

    login({ name, isDark: false }, true);
  };

  return (
    <div className={classes.container}>
      <Divider color={'green'} />
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <InputGroup
          label={'name'}
          onChangeHandler={nameHandler}
          error={nameErr}
          value={name}
        />

        <AuthLink to={'online'} />

        <Button type={'submit'} color="green" isLoading={false}>
          use locally (not implemented yet)
        </Button>
      </form>
    </div>
  );
};

export default LocalAccount;
