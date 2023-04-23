import { Link } from 'react-router-dom';

import classes from './Nav.module.css';

import { arrowBackSVG } from '../../../helpers/svgIcons';

const BackNav = () => {
  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.link}>
        {arrowBackSVG}
        Back
      </Link>
    </nav>
  );
};

export default BackNav;
