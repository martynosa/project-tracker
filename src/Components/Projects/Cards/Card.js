import { useNavigate } from 'react-router-dom';

import classes from './Card.module.css';
import Tag from '../../Common/Tag';
import LoadingCard from './LoadingCard';

import useFetch from '../../../Hooks/useFetch';
import URL from '../../../environment';

import { useNotification } from '../../../Contexts/NotificationContext';

const Card = ({ project, updateProject, deleteProject }) => {
  const { _id, name, description, keywords, status } = project;

  const navigate = useNavigate();
  const { sendRequest, setIsLoading, isLoading } = useFetch();
  const { openNotification } = useNotification();

  const toDetails = () => {
    navigate(`/projects/${_id}`);
  };

  const deleteHandler = async () => {
    try {
      await sendRequest({
        url: `${URL.ITEM_URL}/${_id}`,
        method: 'DELETE',
        isAuthenticated: true,
      });
      deleteProject(_id);
      openNotification('success', 'Project deleted.');
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  const changeStatus = async (type) => {
    let updatedStatus;
    let message;

    if (type === 'upgrade') {
      if (project.status === 'new') {
        updatedStatus = 'inProgress';
        message = 'Project started.';
      }

      if (project.status === 'inProgress') {
        updatedStatus = 'completed';
        message = 'Project completed.';
      }
    }

    if (type === 'degrade') {
      if (project.status === 'completed') {
        updatedStatus = 'inProgress';
        message = 'Project restarted.';
      }

      if (project.status === 'inProgress') {
        updatedStatus = 'new';
        message = 'New project.';
      }
    }

    try {
      const newProject = await sendRequest({
        url: `${URL.ITEM_URL}/${_id}`,
        method: 'PUT',
        body: { status: updatedStatus },
        isAuthenticated: true,
      });
      updateProject(newProject);
      openNotification('success', message);
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  if (isLoading) return <LoadingCard />;

  return (
    <div className={`${classes.card} ${classes[status]}`} onClick={toDetails}>
      <header className={classes.header}>
        <h3 className={classes.title}>{name}</h3>
        <button
          className={`${classes.btn} ${classes.trash}`}
          onClick={deleteHandler}
          disabled={isLoading}
        >
          <ion-icon name="trash"></ion-icon>
        </button>
      </header>

      <p className={classes.description}>{description}</p>

      <div className={classes.tags}>
        {keywords.map((k, index) => (
          <Tag key={`${_id}-${index}`} keyword={k} />
        ))}
      </div>

      <div className={classes.btnGroup}>
        {status !== 'new' && (
          <button
            className={`${classes.btn} ${classes.back}`}
            onClick={() => changeStatus('degrade')}
            disabled={isLoading}
          >
            <ion-icon name="arrow-back"></ion-icon>
          </button>
        )}

        {status !== 'completed' && (
          <button
            className={`${classes.btn} ${classes.forward}`}
            onClick={() => changeStatus('upgrade')}
            disabled={isLoading}
          >
            <ion-icon name="arrow-forward"></ion-icon>
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
