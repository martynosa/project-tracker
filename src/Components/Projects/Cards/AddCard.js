import { useNavigate } from 'react-router-dom';

import classes from './Card.module.css';

const AddCard = () => {
  const navigate = useNavigate();

  const toCreate = () => {
    navigate('/create');
  };

  return (
    <div className={`${classes.card} ${classes.add}`} onClick={toCreate}>
      <ion-icon name="add"></ion-icon>
    </div>
  );
};

export default AddCard;
