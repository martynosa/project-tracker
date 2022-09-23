import { Link } from 'react-router-dom';

import classes from './Auth.module.css';
import Button from '../Common/Button';
import { useNotification } from '../../Contexts/NotificationContext';

const Login = () => {
  const { openNotification } = useNotification();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('submitted');
    openNotification('success', 'Logged in sucessfully!');
  };

  return (
    <>
      <form className={classes.form}>
        <div className={`${classes.inputGroup} mb-24`}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
        </div>

        <div className={`${classes.inputGroup} mb-24`}>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" />
        </div>

        <div className={`${classes.linkGroup} mb-32`}>
          <p>Don't have an account?</p>
          <Link
            to="/register"
            className={`${classes.link} ${classes.orangeLink}`}
          >
            Register&nbsp;<ion-icon name="arrow-round-forward"></ion-icon>
          </Link>
        </div>

        <Button
          text="Log in"
          type="submit"
          color="violet"
          onClickHandler={onSubmitHandler}
        />
      </form>
    </>
  );
};

export default Login;
