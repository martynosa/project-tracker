import classes from './DetailsContainer.module.css';

import Button from '../Common/Button';
import Tag from '../Common/Tag';
import { trashSVG } from '../../helpers/svgIcons';
import { statusTransformer } from '../../helpers/misc';
import ProgressBar from './ProgressBar';

const DetailsContainer = ({ project, openModalHandler }) => {
  if (!project) {
    return (
      <div className={`${classes.detailsContainer} ${classes.loading}`}></div>
    );
  }

  return (
    <div className={classes.detailsContainer}>
      <div className={classes.header}>
        <h2>{project.name}</h2>
        <Button color={'red'} onClick={openModalHandler}>
          {trashSVG}
        </Button>
      </div>
      <p className={classes[project.status]}>
        {statusTransformer(project.status)}
      </p>
      <ProgressBar tasks={project.tasks} status={project.status} />
      <p>{project.description}</p>
      <div className={classes.keywords}>
        {project.keywords.map((k) => (
          <Tag key={k} keyword={k} />
        ))}
      </div>
    </div>
  );
};

export default DetailsContainer;
