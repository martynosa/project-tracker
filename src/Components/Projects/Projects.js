import classes from './Projects.module.css';

import Card from './Card';

const project = {
  status: 'new',
  title: 'Title',
  description:
    'When a card is checked, it will show a checked icon and change it foreground color.',
  tags: ['tagged', 'tricked', 'trapped'],
};

const projectInProgress = {
  status: 'inProgress',
  title: 'Title',
  description:
    'When a card is checked, it will show a checked icon and change it foreground color.',
  tags: ['tagged', 'tricked', 'trapped'],
};

const projectCompleted = {
  status: 'completed',
  title: 'Title',
  description:
    'When a card is checked, it will show a checked icon and change it foreground color.',
  tags: ['tagged', 'tricked', 'trapped'],
};

const Projects = () => {
  return (
    <div className={classes.container}>
      <div className={classes.newContainer}>
        <Card project={project} />
        <Card project={project} />
        <Card project={project} />
      </div>

      <div className={classes.inProgressContainer}>
        <Card project={projectInProgress} />
        <Card project={projectInProgress} />
      </div>

      <div className={classes.completedContainer}>
        <Card project={projectCompleted} />
      </div>
    </div>
  );
};

export default Projects;
