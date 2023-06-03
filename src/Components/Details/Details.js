import { useEffect, useState, useRef } from 'react';
import classes from './Details.module.css';
import Divider from '../Common/Divider';
import Tag from '../Common/Tag';
import Button from '../Common/Button';
import { plusSVG, trashSVG } from '../../helpers/svgIcons';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import URL from '../../environment';
import { useProjects } from '../../Contexts/ProjectsContext';

import { useNotification } from '../../Contexts/NotificationContext';
import Task from './Task';
import InputGroup from '../Common/InputGroup';
import { lengthValidator } from '../../helpers/validators';

const Details = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const HTMLDialog = useRef();

  const openModalHandler = () => setIsModalOpen(true);
  const closeModalHandler = () => setIsModalOpen(false);

  useEffect(() => {
    isModalOpen ? HTMLDialog.current.showModal() : HTMLDialog.current.close();
  }, [isModalOpen]);

  const { id } = useParams();
  const [project, setProject] = useState();
  const { sendRequest, isLoading, setIsLoading } = useFetch();
  const { deleteProject } = useProjects();
  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const [taskDescription, setTaskDescription] = useState();
  const [taskDescriptionErr, setTaskDescriptionErr] = useState();

  const dividerColorPicker = (project) => {
    let color = 'blue';
    if (!project) return color;
    if (project.status === 'inProgress') color = 'orange';
    if (project.status === 'completed') color = 'green';
    return color;
  };

  const statusTransformer = (project) => {
    if (!project) return '';

    if (project.status === 'new' || project.status === 'completed')
      return project.status;

    return 'in progress';
  };

  const deleteHandler = async () => {
    try {
      await sendRequest({
        url: `${URL.ITEM_URL}/${id}`,
        method: 'DELETE',
        isAuthenticated: true,
      });
      deleteProject(id);
      navigate('/projects');
      openNotification('success', 'Project deleted.');
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  const createTaskHandler = async () => {
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
        body: { taskId: taskToDelete.id },
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
          taskId: taskToUpdate.id,
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

  const taskHandler = (e) => {
    const taskDescription = e.target.value.trim();
    setTaskDescriptionErr(lengthValidator(taskDescription, 3));
    setTaskDescription(taskDescription);
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
      <dialog ref={HTMLDialog} className={classes.dialog}>
        <p>Are you sure you want to delete the project?</p>
        <div>
          <Button color={'grey'} onClick={closeModalHandler}>
            close
          </Button>
          <Button color={'red'} onClick={deleteHandler} isLoading={isLoading}>
            delete
          </Button>
        </div>
      </dialog>

      <div className={classes.container}>
        <Divider color={dividerColorPicker(project)} />

        <div className={classes.details}>
          <div className={classes.header}>
            <h2>{project?.name}</h2>
            <Button
              color={'red'}
              onClick={openModalHandler}
              isLoading={isLoading}
            >
              {trashSVG}
            </Button>
          </div>
          <p className={classes[project?.status]}>
            {statusTransformer(project)}
          </p>
          <p>{project?.description}</p>
          <div className={classes.keywords}>
            {project?.keywords.map((k) => (
              <Tag key={k} keyword={k} />
            ))}
          </div>
        </div>
        <div className={classes.table}>
          <ul>
            {project?.tasks.map((t) => (
              <Task
                key={t.id}
                task={t}
                deleteTaskHandler={deleteTaskHandler}
                updateTaskHandler={updateTaskHandler}
              />
            ))}
          </ul>

          <InputGroup
            label={'Add task'}
            type={'text'}
            onChangeHandler={taskHandler}
            error={taskDescriptionErr}
          />
          <Button
            color={'grey'}
            helperClass={classes.addTask}
            onClick={createTaskHandler}
          >
            {plusSVG} Add task
          </Button>
        </div>
      </div>
    </>
  );
};

export default Details;
