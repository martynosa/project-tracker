import { Link } from 'react-router-dom';

import classes from './Nav.module.css';

const BackNav = () => {
  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.link}>
        <ion-icon name="arrow-round-back"></ion-icon>
        Back
      </Link>
    </nav>
  );
};

export default BackNav;
