import classes from './DetailsContainer.module.css';

import Button from '../Common/Button';
import Tag from '../Common/Tag';
import { trashSVG } from '../../helpers/svgIcons';
import { statusTransformer } from '../../helpers/misc';

const DetailsContainer = ({ project, openModalHandler }) => {
  return (
    <div className={classes.details}>
      <div className={classes.header}>
        <h2>{project?.name}</h2>
        <Button color={'red'} onClick={openModalHandler}>
          {trashSVG}
        </Button>
      </div>
      <p className={classes[project?.status]}>{statusTransformer(project)}</p>
      <p>{project?.description}</p>
      <div className={classes.keywords}>
        {project?.keywords.map((k) => (
          <Tag key={k} keyword={k} />
        ))}
      </div>
    </div>
  );
};

export default DetailsContainer;
