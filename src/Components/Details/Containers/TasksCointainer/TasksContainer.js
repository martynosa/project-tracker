import { useState } from 'react';

import classes from './TasksContainer.module.css';

import Task from './Task';
import InputGroup from '../../../Common/InputGroup';
import Button from '../../../Common/Button';
import { plusSVG } from '../../../../helpers/svgIcons';
import { lengthValidator } from '../../../../helpers/validators';

import URL from '../../../../environment';
import useFetch from '../../../../Hooks/useFetch';

import { useNotification } from '../../../../Contexts/NotificationContext';

const TasksContainer = ({ project, setProject }) => {
  const [taskDescription, setTaskDescription] = useState();
  const [taskDescriptionErr, setTaskDescriptionErr] = useState();

  const { sendRequest, setIsLoading } = useFetch();
  const { openNotification } = useNotification();

  const taskHandler = (e) => {
    const taskDescription = e.target.value.trim();
    setTaskDescriptionErr(lengthValidator(taskDescription, 3));
    setTaskDescription(taskDescription);
  };

  const createTaskHandler = async () => {
    const taskValidationErr = lengthValidator(taskDescription, 3);
    setTaskDescriptionErr(taskValidationErr);

    if (taskValidationErr.status) return;

    try {
      const updatedProject = await sendRequest({
        url: `${URL.ITEM_URL}/${project._id}/tasks`,
        method: 'POST',
        isAuthenticated: true,
        body: {
          description: taskDescription,
        },
      });
      setProject(updatedProject);
      openNotification('success', 'Task added.');
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  const deleteTaskHandler = async (taskToDelete) => {
    try {
      const updatedProject = await sendRequest({
        url: `${URL.ITEM_URL}/${project._id}/tasks`,
        method: 'DELETE',
        isAuthenticated: true,
        body: { taskId: taskToDelete._id },
      });
      setProject(updatedProject);
      openNotification('success', 'Task deleted.');
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  const updateTaskHandler = async (taskToUpdate) => {
    try {
      const updatedProject = await sendRequest({
        url: `${URL.ITEM_URL}/${project._id}/tasks`,
        method: 'PUT',
        isAuthenticated: true,
        body: {
          taskId: taskToUpdate._id,
          isCompleted: !taskToUpdate.isCompleted,
        },
      });
      setProject(updatedProject);
      openNotification('success', 'Task updated.');
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

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
        <Button color={'grey'} onClick={createTaskHandler}>
          {plusSVG} Add task
        </Button>
      </div>
    </div>
  );
};

export default TasksContainer;
