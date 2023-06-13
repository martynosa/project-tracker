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

  const toDetailsHandler = () => {
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
      const updatedProject = await sendRequest({
        url: `${URL.ITEM_URL}/${_id}`,
        method: 'PUT',
        body: { status: updatedStatus },
        isAuthenticated: true,
      });
      updateProject(updatedProject);
      openNotification('success', message);
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  const upgradeStatusHandler = (e) => {
    e.stopPropagation();
    changeStatus('upgrade');
  };

  const degradeStatusHandler = (e) => {
    e.stopPropagation();
    changeStatus('degrade');
  };

  if (isLoading) return <LoadingCard />;

  return (
    <div
      className={`${classes.card} ${classes[status]}`}
      onClick={toDetailsHandler}
    >
      <h3>{name}</h3>

      <p>{description}</p>

      <ul>
        {keywords.map((k, index) => (
          <Tag key={`${_id}-${index}`} keyword={k} />
        ))}
      </ul>

      <div className={classes.btnGroup}>
        {status !== 'new' && (
          <button
            className={classes.back}
            onClick={degradeStatusHandler}
            disabled={isLoading}
          >
            {largeArrowBackSVG}
          </button>
        )}

        {status !== 'completed' && (
          <button
            className={classes.forward}
            onClick={upgradeStatusHandler}
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
