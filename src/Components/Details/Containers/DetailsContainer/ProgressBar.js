import classes from './ProgressBar.module.css';

const ProgressBar = ({ tasks, status }) => {
  let projectProgress = 0;
  let completedTasks = [];

  if (completedTasks && tasks) {
    if (completedTasks.length !== 0 || tasks.length !== 0) {
      completedTasks = tasks.filter((t) => t.isCompleted === true);
      projectProgress = Math.floor(
        (completedTasks.length * 100) / tasks.length
      );
    }
  }

  return (
    <div className={classes.progressBar}>
      <p>{projectProgress}%</p>
      <div
        className={
          projectProgress === 100 ? classes.completed : classes[status]
        }
        style={{ width: `${projectProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
