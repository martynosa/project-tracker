import { useState, useEffect } from 'react';

import classes from './Projects.module.css';
import Card from './Card';

import { ITEM_URL } from '../../helpers/constants';
import useFetch from '../../Hooks/useFetch';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const { sendRequest, isLoading, setIsLoading } = useFetch();

  const newProjects = projects.filter((p) => p.status === 'new');
  const inProgressProjects = projects.filter((p) => p.status === 'inProgress');
  const completedProjects = projects.filter((p) => p.status === 'completed');

  const updateProject = (project) => {
    setProjects((state) => {
      const newState = state.filter((p) => p._id !== project._id);
      newState.push(project);
      return newState;
    });
  };

  const deleteProject = (projectId) => {
    setProjects((state) => {
      return state.filter((p) => p._id !== projectId);
    });
  };

  useEffect(() => {
    const httpConfig = {
      url: `${ITEM_URL}`,
      isAuthorized: true,
    };

    sendRequest(httpConfig).then((data) => {
      setProjects(data);
    });
  }, [sendRequest]);

  return (
    <div className={classes.container}>
      <div className={classes.newContainer}>
        {newProjects.map((p) => (
          <Card
            key={p._id}
            project={p}
            updateProject={updateProject}
            deleteProject={deleteProject}
          />
        ))}
      </div>

      <div className={classes.inProgressContainer}>
        {inProgressProjects.map((p) => (
          <Card
            key={p._id}
            project={p}
            updateProject={updateProject}
            deleteProject={deleteProject}
          />
        ))}
      </div>

      <div className={classes.completedContainer}>
        {completedProjects.map((p) => (
          <Card
            key={p._id}
            project={p}
            updateProject={updateProject}
            deleteProject={deleteProject}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
