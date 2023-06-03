import { useNavigate } from 'react-router-dom';

import classes from './Card.module.css';
import Tag from '../../Common/Tag';
import LoadingCard from './LoadingCard';
import {
  largeArrowForwardSVG,
  largeArrowBackSVG,
} from '../../../helpers/svgIcons';

import URL from '../../../environment';
import useFetch from '../../../Hooks/useFetch';
import { useProjects } from '../../../Contexts/ProjectsContext';

import { useNotification } from '../../../Contexts/NotificationContext';

const Card = ({ project }) => {
  const { _id, name, description, keywords, status } = project;

  const { updateProject } = useProjects();

  const navigate = useNavigate();
  const { sendRequest, setIsLoading, isLoading } = useFetch();
  const { openNotification } = useNotification();

  const toDetails = () => {
    navigate(`/projects/${_id}`);
    return;
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

  const upgradeStatus = (e) => {
    e.stopPropagation();
    changeStatus('upgrade');
  };

  const degradeStatus = (e) => {
    e.stopPropagation();
    changeStatus('degrade');
  };

  if (isLoading) return <LoadingCard />;

  return (
    <div className={`${classes.card} ${classes[status]}`} onClick={toDetails}>
      <h3 className={classes.title}>{name}</h3>

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
            onClick={degradeStatus}
            disabled={isLoading}
          >
            {largeArrowBackSVG}
          </button>
        )}

        {status !== 'completed' && (
          <button
            className={`${classes.btn} ${classes.forward}`}
            onClick={upgradeStatus}
            disabled={isLoading}
          >
            {largeArrowForwardSVG}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
