import { useNavigate } from 'react-router-dom';
import Button from './Button';
import classes from './PageHeader.module.css';

const PageHeader = ({ pageTitle }) => {
  const navigate = useNavigate();

  const onBackHandler = () => {
    navigate(-1);
  };

  return (
    <div className={classes.pageHeader}>
      <button onClick={onBackHandler}>back</button>
      <h1 className={`${classes.mainHeading} mt-32`}>{pageTitle}</h1>
    </div>
  );
};

export default PageHeader;
