import { useState } from 'react';

import classes from './TasksContainer.module.css';

import Task from './Task';
import InputGroup from '../../../Common/InputGroup';
import Button from '../../../Common/Button';
import { plusSVG } from '../../../../helpers/svgIcons';
import { lengthValidator } from '../../../../helpers/validators';

const TasksContainer = ({
  project,
  createTaskHandler,
  deleteTaskHandler,
  updateTaskHandler,
}) => {
  const [taskDescription, setTaskDescription] = useState();
  const [taskDescriptionErr, setTaskDescriptionErr] = useState();

  const taskHandler = (e) => {
    const taskDescription = e.target.value.trim();
    setTaskDescriptionErr(lengthValidator(taskDescription, 3));
    setTaskDescription(taskDescription);
  };

  const handleTaskCreation = () =>
    createTaskHandler(taskDescription, setTaskDescriptionErr);

  if (!project) {
    return <div className={`${classes.table} ${classes.loading}`}></div>;
  }

  return (
    <div className={classes.table}>
      <ul>
        {project.tasks.map((t) => (
          <Task
            key={t._id}
            task={t}
            deleteTaskHandler={deleteTaskHandler}
            updateTaskHandler={updateTaskHandler}
          />
        ))}
      </ul>

      <div className={classes.inputGroup}>
        <InputGroup
          label={'Add task'}
          type={'text'}
          onChangeHandler={taskHandler}
          error={taskDescriptionErr}
        />
        <Button color={'grey'} onClick={handleTaskCreation}>
          {plusSVG} Add task
        </Button>
      </div>
    </div>
  );
};

export default TasksContainer;
