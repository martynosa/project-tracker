import classes from './Projects.module.css';
import Tag from './Common/Tag';

const Projects = () => {
  return (
    <div className={classes.container}>
      <div className={classes.newContainer}>
        <div className={classes.card}>
          <h3 className={classes.cardTitle}>Title</h3>
          <p className={classes.cardDescription}>
            When a card is checked, it will show a checked icon and change its
            foreground color. There is no default behavior for
            enabling/disabling the checked state. An example of how to do it in
            response to a long click is shown below.
          </p>
          <div className={classes.tags}>
            <Tag keyword={'tagged'} />
            <Tag keyword={'tricked'} />
            <Tag keyword={'tred'} />
            <Tag keyword={'trapped'} />
            <Tag keyword={'trapped'} />
          </div>
        </div>

        <div className={classes.card}>
          <h3 className={classes.cardTitle}>Title</h3>
          <p className={classes.cardDescription}>
            When a card is checked, it will show a checked icon and change its
            foreground color. There is no default behavior for
            enabling/disabling the checked state. An example of how to do it in
            response to a long click is shown below.
          </p>
          <div className={classes.tags}>
            <Tag keyword={'tagged'} />
            <Tag keyword={'tricked'} />
            <Tag keyword={'tred'} />
            <Tag keyword={'trapped'} />
            <Tag keyword={'trapped'} />
          </div>
        </div>
      </div>

      <div className={classes.inProgressContainer}>
        <div className={classes.card}>
          <h3 className={classes.cardTitle}>Title</h3>
          <p className={classes.cardDescription}>
            When a card is checked, it will show a checked icon and change its
            foreground color. There is no default behavior for
            enabling/disabling the checked state. An example of how to do it in
            response to a long click is shown below.
          </p>
          <div className={classes.tags}>
            <Tag keyword={'tagged'} />
            <Tag keyword={'tricked'} />
            <Tag keyword={'tred'} />
            <Tag keyword={'trapped'} />
            <Tag keyword={'trapped'} />
          </div>
        </div>
      </div>

      <div className={classes.finishedContainer}>
        <div className={classes.card}>
          <h3 className={classes.cardTitle}>Title</h3>
          <p className={classes.cardDescription}>
            When a card is checked, it will show a checked icon and change its
            foreground color. There is no default behavior for
            enabling/disabling the checked state. An example of how to do it in
            response to a long click is shown below.
          </p>
          <div className={classes.tags}>
            <Tag keyword={'tagged'} />
            <Tag keyword={'tricked'} />
            <Tag keyword={'tred'} />
            <Tag keyword={'trapped'} />
            <Tag keyword={'trapped'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
