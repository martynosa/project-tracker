import classes from './Card.module.css';
import Tag from '../Common/Tag';
import Button from '../Common/Button';

const Card = ({ project }) => {
  //   const { title, description, tags } = project;
  let className = `${classes.card} ${classes[project.status]}`;

  return (
    <div className={className}>
      <header className={classes.cardHeader}>
        <h3 className={classes.title}>Title</h3>
        <Button helperClass={classes.btnTrash}>
          <ion-icon name="trash"></ion-icon>
        </Button>
      </header>

      <p className={classes.cardDescription}>
        When a card is checked, it will show a checked icon and change its
        foreground color. There is no default behavior for enabling/disabling
        the checked state. An example of how to do it in response to a long
        click is shown below.
      </p>

      <div className={classes.tags}>
        <Tag keyword={'tagged'} />
        <Tag keyword={'tricked'} />
        <Tag keyword={'tred'} />
        <Tag keyword={'trapped'} />
        <Tag keyword={'trapped'} />
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
