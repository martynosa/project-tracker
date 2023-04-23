import classes from './ProjectsContainer.module.css';

import AddCard from '../Cards/AddCard';
import Card from '../Cards/Card';
import Divider from '../../Common/Divider';

const ProjectsContainer = ({ projects, updateProject, deleteProject }) => {
  const newP = projects.filter((p) => p.status === 'new');
  const inProgressP = projects.filter((p) => p.status === 'inProgress');
  const completedP = projects.filter((p) => p.status === 'completed');

  return (
    <div className={classes.projectsContainer}>
      <div>
        <Divider color={'blue'} />
        <AddCard />
        {newP.length === 0 && <p className={classes.emptyMessage}>...</p>}
        {newP.map((p) => (
          <Card
            key={p._id}
            project={p}
            updateProject={updateProject}
            deleteProject={deleteProject}
          />
        ))}
      </div>

      <div>
        <Divider color={'orange'} />
        {inProgressP.length === 0 && (
          <p className={classes.emptyMessage}>...</p>
        )}
        {inProgressP.map((p) => (
          <Card
            key={p._id}
            project={p}
            updateProject={updateProject}
            deleteProject={deleteProject}
          />
        ))}
      </div>

      <div>
        <Divider color={'green'} />
        {completedP.length === 0 && <p className={classes.emptyMessage}>...</p>}
        {completedP.map((p) => (
          <Card
            key={p._id}
            project={p}
            updateProject={updateProject}
            deleteProject={deleteProject}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsContainer;
