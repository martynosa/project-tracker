import { useNavigate } from 'react-router-dom';

import classes from './Landing.module.css';
import Button from './Common/Button';

const Landing = () => {
  const navigate = useNavigate();

  const onGetStartedHandler = () => {
    navigate('/register');
  };

  return (
    <section className={classes.container}>
      <div className={classes.headerBox}>
        <h1 className={`${classes.main} mb-12`}>
          Reach new productivity<span>peaks</span>
        </h1>

        <p className={`${classes.secondary} mb-32`}>
          Create, track and manage your projects with ease.
        </p>
        <Button color={'orange'} onClickHandler={onGetStartedHandler}>
          Get started&nbsp;<ion-icon name="arrow-round-forward"></ion-icon>
        </Button>
      </div>

      <img
        className={classes.img}
        src="../../imgs/landing-4.webp"
        alt="people brainstorming"
      />
    </section>
  );
};

export default Landing;
