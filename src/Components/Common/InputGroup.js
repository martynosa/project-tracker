import { useId } from 'react';

import classes from './InputGroup.module.css';

const InputGroup = ({ label, type, onChangeHandler, error, value }) => {
  const inputId = useId();

  const inputType = type || 'text';
  const errorStatus = error?.status || false;
  const errorMessage = error?.message || '';

  return (
    <div className={`${classes.inputGroup} mb-24`}>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type={inputType}
        onChange={onChangeHandler}
        className={errorStatus ? classes.errorInput : undefined}
        value={value}
      />
      {errorStatus && (
        <p className={`${classes.errorMessage} mt-03`}>{errorMessage}</p>
      )}
    </div>
  );
};

export default InputGroup;
