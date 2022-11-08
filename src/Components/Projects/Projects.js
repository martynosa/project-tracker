import { useState, useEffect } from 'react';

import classes from './Projects.module.css';
import Card from './Card';

import { ITEM_URL } from '../../helpers/constants';
import useFetch from '../../Hooks/useFetch';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const { sendRequest, isLoading, setIsLoading } = useFetch();

  const httpConfig = {
    url: `${ITEM_URL}`,
    isAuthorized: true,
  };

  const newProjects = projects.filter((p) => p.status === 'new');
  const inProgressProjects = projects.filter((p) => p.status === 'inProgress');
  const completedProjects = projects.filter((p) => p.status === 'completed');

  useEffect(() => {
    sendRequest(httpConfig).then((data) => {
      setProjects(data);
    });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.newContainer}>
        {newProjects.map((p) => (
          <Card key={p._id} project={p} />
        ))}
      </div>

      <div className={classes.inProgressContainer}>
        {inProgressProjects.map((p) => (
          <Card key={p._id} project={p} />
        ))}
      </div>

      <div className={classes.completedContainer}>
        {completedProjects.map((p) => (
          <Card key={p._id} project={p} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
