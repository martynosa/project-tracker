import classes from './Card.module.css';
import Tag from '../Common/Tag';
import Button from '../Common/Button';

const Card = ({ project }) => {
  console.log(project);
  const { name, description, keywords } = project;
  let className = `${classes.card} ${classes[project.status]}`;

  return (
    <div className={className}>
      <header className={classes.cardHeader}>
        <h3 className={classes.title}>{name}</h3>
        <Button helperClass={classes.btnTrash}>
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
        <Button helperClass={classes.btnBack}>
          <ion-icon name="arrow-back"></ion-icon>
        </Button>
        <Button helperClass={classes.btnForward}>
          <ion-icon name="arrow-forward"></ion-icon>
        </Button>
      </div>
    </div>
  );
};

export default Card;
