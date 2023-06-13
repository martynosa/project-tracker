import { useNavigate } from 'react-router-dom';

import classes from './Card.module.css';

import { largePlusSVG } from '../../../helpers/svgIcons';

const AddCard = () => {
  const navigate = useNavigate();

  const toCreateHandler = () => {
    navigate('/create');
  };

  return (
    <div className={`${classes.card} ${classes.add}`} onClick={toCreateHandler}>
      {largePlusSVG} Add project
    </div>
  );
};

export default AddCard;
