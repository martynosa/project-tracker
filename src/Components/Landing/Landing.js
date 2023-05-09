import { useNavigate } from 'react-router-dom';

import classes from './Landing.module.css';
import Button from '../Common/Button';
import { arrowUpRightSVG } from '../../helpers/svgIcons';

const Landing = () => {
  const navigate = useNavigate();

  const getStartedHandler = () => {
    navigate('/register');
  };

  return (
    <section className={classes.container}>
      <div>
        <h1 className={classes.main}>
          Reach new productivity<span>peaks</span>
        </h1>

        <p className={classes.secondary}>
          Create, track and manage your projects with ease.
        </p>

        <div className={classes.btnBox}>
          <Button color={'orange'} onClick={getStartedHandler}>
            Get started
            {arrowUpRightSVG}
          </Button>
        </div>
      </div>

      <div className={classes.imgBox}>
        <img
          className={classes.img}
          src="../../imgs/landing-4.webp"
          alt="people brainstorming"
        />
      </div>
    </section>
  );
};

export default Landing;
