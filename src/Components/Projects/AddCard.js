import { useNavigate } from 'react-router-dom';

import classes from './AddCard.module.css';

const AddCard = () => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate('/create');
  };

  return (
    <div className={classes.card} onClick={navigateTo}>
      <ion-icon name="add"></ion-icon>
    </div>
  );
};

export default AddCard;
