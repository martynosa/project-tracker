import { useId } from 'react';
import classes from './Textarea.module.css';

const Textarea = ({ label, onChangeHandler, error, value }) => {
  const inputId = useId();

  const errorStatus = error?.status || false;
  const errorMessage = error?.message || '';

  return (
    <div className={`${classes.textAreaGroup} mb-24`}>
      <label htmlFor={inputId}>{label}</label>
      <textarea
        id={inputId}
        onChange={onChangeHandler}
        className={errorStatus ? classes.errorInput : undefined}
        value={value}
      ></textarea>
      {errorStatus && <p className={classes.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default Textarea;
