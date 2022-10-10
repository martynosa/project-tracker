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
      <Button
        color={'grey'}
        helperClass={classes.backBtn}
        onClickHandler={onBackHandler}
      >
        <ion-icon name="arrow-round-back"></ion-icon>&nbsp;Back
      </Button>
      <h1 className={classes.mainHeading}>{pageTitle}</h1>
    </div>
  );
};

export default PageHeader;
