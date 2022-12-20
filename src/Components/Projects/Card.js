import classes from './Card.module.css';
import Tag from '../Common/Tag';
import Button from '../Common/Button';

import useFetch from '../../Hooks/useFetch';
import URL from '../../helpers/constants';

import { useNotification } from '../../Contexts/NotificationContext';

const Card = ({ project, updateProject, deleteProject }) => {
  const { _id, name, description, keywords, status } = project;
  let className = `${classes.card} ${classes[status]}`;

  const { sendRequest } = useFetch();

  const { openNotification, setIsLoading } = useNotification();

  const deleteHandler = async () => {
    try {
      sendRequest({
        url: `${URL.ITEM_URL}/${_id}`,
        method: 'DELETE',
        isAuthorized: true,
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
        isAuthorized: true,
      });
      updateProject(newProject);
      openNotification('success', message);
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  return (
    <div className={className}>
      <header className={classes.cardHeader}>
        <h3 className={classes.title}>{name}</h3>
        <Button helperClass={classes.btnTrash} onClick={deleteHandler}>
          <ion-icon name="trash"></ion-icon>
        </Button>
      </header>

      <p className={classes.cardDescription}>{description}</p>

      <div className={classes.tags}>
        {keywords.map((k, index) => (
          <Tag key={`${_id}-${index}`} keyword={k} />
        ))}
      </div>

      <div className={classes.btnGroup}>
        {status !== 'new' && (
          <Button
            helperClass={classes.btnBack}
            onClick={() => changeStatus('degrade')}
          >
            <ion-icon name="arrow-back"></ion-icon>
          </Button>
        )}

        {status !== 'completed' && (
          <Button
            helperClass={classes.btnForward}
            onClick={() => changeStatus('upgrade')}
          >
            <ion-icon name="arrow-forward"></ion-icon>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
