import classes from './Card.module.css';
import Tag from '../Common/Tag';
import Button from '../Common/Button';

import useFetch from '../../Hooks/useFetch';
import { ITEM_URL } from '../../helpers/constants';

const Card = ({ project }) => {
  console.log(project);
  const { _id, name, description, keywords } = project;
  let className = `${classes.card} ${classes[project.status]}`;

  const { sendRequest, isLoading, setIsLoading } = useFetch();

  const deleteHandler = async () => {
    console.log('deleted');
  };

  const upgradeStatusHandler = () => {
    console.log('updated');
  };

  const degradeStatusHandler = () => {
    console.log('degraded');
  };

  return (
    <div className={className}>
      <header className={classes.cardHeader}>
        <h3 className={classes.title}>{name}</h3>
        <Button helperClass={classes.btnTrash} onClick={deleteHandler}>
          <ion-icon name="trash"></ion-icon>
        </Button>
      </header>

      <p className={classes.cardDescription}>{description}</p>

      <div className={classes.tags}>
        {keywords.map((k) => (
          <Tag keyword={k} />
        ))}
      </div>

      <div className={classes.btnGroup}>
        <Button helperClass={classes.btnBack} onClick={degradeStatusHandler}>
          <ion-icon name="arrow-back"></ion-icon>
        </Button>
        <Button helperClass={classes.btnForward} onClick={upgradeStatusHandler}>
          <ion-icon name="arrow-forward"></ion-icon>
        </Button>
      </div>
    </div>
  );
};

export default Card;
