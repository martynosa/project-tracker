import { useState, useEffect } from 'react';

import classes from './Projects.module.css';

import Search from './Search';
import LoadingContainer from './Containers/LoadingContainer';
import ProjectsContainer from './Containers/ProjectsContainer';

import URL from '../../environment';
import useFetch from '../../Hooks/useFetch';
import { useProjects } from '../../Contexts/ProjectsContext';
import searchService from '../../helpers/searchService';

import { useNotification } from '../../Contexts/NotificationContext';

const Projects = () => {
  const { projects, setProjects } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');

  const { sendRequest, isLoading, setIsLoading } = useFetch();
  const { openNotification } = useNotification();

  const filteredProjects = searchService(projects, searchQuery);

  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
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
  }, [sendRequest, setIsLoading, openNotification, setProjects]);

  return (
    <div className={classes.container}>
      <Search searchHandler={searchHandler} />
      {isLoading && <LoadingContainer />}
      {!isLoading && <ProjectsContainer projects={filteredProjects} />}
    </div>
  );
};

export default Projects;
