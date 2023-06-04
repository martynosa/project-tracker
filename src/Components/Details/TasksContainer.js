import { useState } from 'react';

import classes from './TasksContainer.module.css';

import Task from './Task';
import InputGroup from '../Common/InputGroup';
import Button from '../Common/Button';
import { plusSVG } from '../../helpers/svgIcons';
import { lengthValidator } from '../../helpers/validators';

const TasksContainer = ({
  tasks,
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

  return (
    <div className={classes.table}>
      <ul>
        {tasks?.map((t) => (
          <Task
            key={t.id}
            task={t}
            deleteTaskHandler={deleteTaskHandler}
            updateTaskHandler={updateTaskHandler}
          />
        ))}
      </ul>

      <div className={classes.addTaskInputGroup}>
        <InputGroup
          label={'Add task'}
          type={'text'}
          onChangeHandler={taskHandler}
          error={taskDescriptionErr}
        />
        <Button
          color={'grey'}
          helperClass={classes.addTask}
          onClick={() => createTaskHandler(taskDescription)}
        >
          {plusSVG} Add task
        </Button>
      </div>
    </div>
  );
};

export default TasksContainer;
