import classes from './ProjectsContainer.module.css';

import AddCard from '../Cards/AddCard';
import Card from '../Cards/Card';
import Divider from '../../Common/Divider';

const ProjectsContainer = ({ projects }) => {
  const newP = projects.filter((p) => p.status === 'new');
  const inProgressP = projects.filter((p) => p.status === 'inProgress');
  const completedP = projects.filter((p) => p.status === 'completed');

  return (
    <div className={classes.container}>
      <div>
        <Divider color={'blue'} />
        <AddCard />
        {newP.length === 0 && <p className={classes.noProjects}>...</p>}
        {newP.map((p) => (
          <Card key={p._id} project={p} />
        ))}
      </div>

      <div>
        <Divider color={'orange'} />
        {inProgressP.length === 0 && <p className={classes.noProjects}>...</p>}
        {inProgressP.map((p) => (
          <Card key={p._id} project={p} />
        ))}
      </div>

      <div>
        <Divider color={'green'} />
        {completedP.length === 0 && <p className={classes.noProjects}>...</p>}
        {completedP.map((p) => (
          <Card key={p._id} project={p} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsContainer;
