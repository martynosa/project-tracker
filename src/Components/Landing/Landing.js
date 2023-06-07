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
    <>
      <section className={classes.heroContainer}>
        <div className={classes.hero}>
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
        </div>
      </section>
      <section className={classes.featuresContainer}>
        <div className={classes.features}>
          <h2>features</h2>
          <div className={classes.list}>
            <div className={`${classes.card} ${classes.blue}`}>
              <header className={classes.header}>
                <h3 className={classes.title}>Status-based organization</h3>
              </header>
              <p className={classes.description}>
                Keep track of your projects and their progress by easily
                categorizing them into new, in progress or completed.
              </p>
            </div>
            <div className={`${classes.card} ${classes.orange}`}>
              <header className={classes.header}>
                <h3 className={classes.title}>Task management</h3>
              </header>
              <p className={classes.description}>
                Each project has its own subset of smaller tasks that you can
                toggle to keep track of progress.
              </p>
            </div>
            <div className={`${classes.card} ${classes.green}`}>
              <header className={classes.header}>
                <h3 className={classes.title}>
                  Simple and intuitive interface
                </h3>
              </header>
              <p className={classes.description}>
                Lets you focus on your work without any distractions
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer>Made by martynosa for demo purposes.</footer>
    </>
  );
};

export default Landing;
