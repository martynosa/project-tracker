import { useState, useEffect } from 'react';

import classes from './Projects.module.css';

import Search from './Search';
import LoadingContainer from './Containers/LoadingContainer';
import ProjectsContainer from './Containers/ProjectsContainer';

import URL from '../../environment';
import useFetch from '../../Hooks/useFetch';
import { useAuth } from '../../Contexts/AuthContext';
import searchService from '../../helpers/searchService';

import { useNotification } from '../../Contexts/NotificationContext';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const { isLocal } = useAuth();

  const { sendRequest, isLoading, setIsLoading } = useFetch();
  const { openNotification } = useNotification();

  const filteredProjects = searchService(projects, searchQuery);

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

  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    console.log(isLocal);
    if (!isLocal) {
      sendRequest({
        url: `${URL.ITEM_URL}`,
        isAuthenticated: true,
      })
        .then((data) => {
          setProjects(data);
        })
        .catch((error) => {
          setIsLoading(false);
          openNotification('fail', error.message);
        });
    }
  }, [sendRequest, setIsLoading, openNotification, isLocal]);

  return (
    <div className={classes.container}>
      <Search searchHandler={searchHandler} />
      {isLoading && <LoadingContainer />}
      {!isLoading && (
        <ProjectsContainer
          projects={filteredProjects}
          updateProject={updateProject}
          deleteProject={deleteProject}
        />
      )}
    </div>
  );
};

export default Projects;
