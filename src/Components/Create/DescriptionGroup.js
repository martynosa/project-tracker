import classes from './DescriptionGroup.module.css';

const DescriptionGroup = ({ label, onChangeHandler, error, value }) => {
  const errorStatus = error?.status || false;
  const errorMessage = error?.message || '';

  return (
    <div className={`${classes.descriptionGroup} mb-24`}>
      <label htmlFor="description">{label}</label>
      <textarea
        id="description"
        onChange={onChangeHandler}
        className={errorStatus ? classes.errorInput : undefined}
        value={value}
      ></textarea>
      {errorStatus && <p className={classes.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default DescriptionGroup;
