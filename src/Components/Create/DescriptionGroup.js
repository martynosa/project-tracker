import classes from './DescriptionGroup.module.css';

const DescriptionGroup = ({ onChangeHandler, error }) => {
  const errorStatus = error?.status || false;
  const errorMessage = error?.message || '';

  return (
    <div className={`${classes.descriptionGroup} mb-24`}>
      <label htmlFor="description">description</label>
      <textarea
        id="description"
        onChange={onChangeHandler}
        className={errorStatus ? classes.errorInput : undefined}
      ></textarea>
      {errorStatus && (
        <p className={`${classes.errorMessage} mt-03`}>{errorMessage}</p>
      )}
    </div>
  );
};

export default DescriptionGroup;