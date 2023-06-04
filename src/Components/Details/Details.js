import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import classes from './Details.module.css';
import Divider from '../Common/Divider';
import DetailsContainer from './DetailsContainer';
import DeleteDialog from './DeleteDialog';
import TasksContainer from './TasksContainer';
import { lengthValidator } from '../../helpers/validators';
import { dividerColorPicker } from '../../helpers/misc';

import URL from '../../environment';
import useFetch from '../../Hooks/useFetch';

import { useNotification } from '../../Contexts/NotificationContext';

const Details = () => {
  const { id } = useParams();
  const [project, setProject] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const { sendRequest, isLoading, setIsLoading } = useFetch();
  const { openNotification } = useNotification();

  const openModalHandler = () => setIsModalOpen(true);
  const closeModalHandler = () => setIsModalOpen(false);

  const deleteHandler = async () => {
    try {
      await sendRequest({
        url: `${URL.ITEM_URL}/${id}`,
        method: 'DELETE',
        isAuthenticated: true,
      });
      navigate('/projects');
      openNotification('success', 'Project deleted.');
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  const createTaskHandler = async (taskDescription, setTaskDescriptionErr) => {
    const taskValidationErr = lengthValidator(taskDescription, 3);
    setTaskDescriptionErr(taskValidationErr);

    if (taskValidationErr.status) return;

    try {
      const updatedProject = await sendRequest({
        url: `${URL.ITEM_URL}/${id}/tasks`,
        method: 'POST',
        isAuthenticated: true,
        body: {
          description: taskDescription,
        },
      });
      setProject(updatedProject);
      console.log(updatedProject.tasks);
      openNotification('success', 'Task added.');
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  const deleteTaskHandler = async (taskToDelete) => {
    try {
      const updatedProject = await sendRequest({
        url: `${URL.ITEM_URL}/${id}/tasks`,
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
        url: `${URL.ITEM_URL}/${id}/tasks`,
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

  useEffect(() => {
    sendRequest({
      url: `${URL.ITEM_URL}/${id}`,
      isAuthenticated: true,
    })
      .then((data) => setProject(data))
      .catch((error) => {
        setIsLoading(false);
        openNotification('fail', error.message);
      });
  }, [id, openNotification, sendRequest, setIsLoading]);

  return (
    <>
      <DeleteDialog
        isModalOpen={isModalOpen}
        closeModalHandler={closeModalHandler}
        deleteHandler={deleteHandler}
        isLoading={isLoading}
      />

      <div className={classes.container}>
        <Divider color={dividerColorPicker(project)} />

        <DetailsContainer
          project={project}
          openModalHandler={openModalHandler}
        />

        <TasksContainer
          id={id}
          project={project}
          createTaskHandler={createTaskHandler}
          deleteTaskHandler={deleteTaskHandler}
          updateTaskHandler={updateTaskHandler}
        />
      </div>
    </>
  );
};

export default Details;
