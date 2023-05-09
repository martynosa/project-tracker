import { useNavigate } from 'react-router-dom';

import classes from './Landing.module.css';
import Button from '../Common/Button';
import { arrowUpRightSVG } from '../../helpers/svgIcons';

const Landing = () => {
  const navigate = useNavigate();

  const getStartedHandler = () => {
    navigate('/register');
  };

  // return (
  //   <section className={classes.container}>
  //     <div>
  //       <h1 className={classes.main}>
  //         Reach new productivity<span>peaks</span>
  //       </h1>

  //       <p className={classes.secondary}>
  //         Create, track and manage your projects with ease.
  //       </p>

  //       <div className={classes.btnBox}>
  //         <Button color={'orange'} onClick={getStartedHandler}>
  //           Get started
  //           {arrowUpRightSVG}
  //         </Button>
  //       </div>
  //     </div>

  //     <div className={classes.imgBox}>
  //       <img
  //         className={classes.img}
  //         src="../../imgs/landing-4.webp"
  //         alt="people brainstorming"
  //       />
  //     </div>
  //   </section>
  // );

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
            <div className={classes.card}>
              <header className={classes.header}>
                <h3 className={classes.title}>dummy title</h3>
              </header>
              <p className={classes.description}>dummy description</p>
            </div>
            <div className={classes.card}>
              <header className={classes.header}>
                <h3 className={classes.title}>dummy title 2</h3>
              </header>
              <p className={classes.description}>dummy description 2</p>
            </div>
            <div className={classes.card}>
              <header className={classes.header}>
                <h3 className={classes.title}>dummy title 3</h3>
              </header>
              <p className={classes.description}>dummy description 3</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
