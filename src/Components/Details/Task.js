import {
  largeCheckmarkSVG,
  largeExclamationMark,
} from '../../helpers/svgIcons';
import Button from '../Common/Button';
import classes from './Task.module.css';

const Task = ({ task, deleteTaskHandler, updateTaskHandler }) => {
  return (
    <li
      className={
        task.isCompleted
          ? classes.task
          : `${classes.task} ${classes.inProgress}`
      }
    >
      {task.isCompleted ? largeCheckmarkSVG : largeExclamationMark}
      <p>{task.description}</p>
      <Button
        color={task.isCompleted ? 'green' : 'orange'}
        onClick={() => updateTaskHandler(task)}
      >
        {task.isCompleted ? 'completed' : 'in progress'}
      </Button>
      <Button color={'red'} onClick={() => deleteTaskHandler(task)}>
        delete
      </Button>
    </li>
  );
};

export default Task;
