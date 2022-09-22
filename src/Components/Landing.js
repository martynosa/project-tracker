import { Link } from 'react-router-dom';

import classes from './Landing.module.css';

const Landing = () => {
  return (
    <section className={classes.container}>
      <div className={classes.headerBox}>
        <h1 className={`${classes.main} mb-12`}>
          Reach new productivity<span>peaks</span>
        </h1>

        <p className={`${classes.secondary} mb-32`}>
          Create, track and manage your projects with ease.
        </p>
        <Link to="/register" className={classes.btn}>
          Get started&nbsp;<ion-icon name="arrow-round-forward"></ion-icon>
        </Link>
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
