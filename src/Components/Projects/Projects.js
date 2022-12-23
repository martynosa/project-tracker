import { useState, useEffect } from 'react';

import classes from './Projects.module.css';

import Card from './Card';
import Search from './Search';
import Loading from '../Common/Loading';
import Divider from '../Common/Divider';

import URL from '../../environment';
import useFetch from '../../Hooks/useFetch';
import searchService from '../../helpers/searchService';

import { useNotification } from '../../Contexts/NotificationContext';
import AddCard from './AddCard';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const { sendRequest, isLoading, setIsLoading } = useFetch();
  const { openNotification } = useNotification();

  const filteredP = searchService(projects, searchQuery);

  const newP = filteredP.filter((p) => p.status === 'new');
  const inProgressP = filteredP.filter((p) => p.status === 'inProgress');
  const completedP = filteredP.filter((p) => p.status === 'completed');

  const updateP = (project) => {
    setProjects((state) => {
      const newState = state.filter((p) => p._id !== project._id);
      newState.push(project);
      return newState;
    });
  };

  const deleteP = (projectId) => {
    setProjects((state) => {
      return state.filter((p) => p._id !== projectId);
    });
  };

  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    sendRequest({
      url: `${URL.ITEM_URL}`,
      isAuthorized: true,
    })
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        setIsLoading(false);
        openNotification('fail', error.message);
      });
  }, [sendRequest, setIsLoading, openNotification]);

  return (
    <div className={classes.container}>
      <Search searchHandler={searchHandler} />
      {isLoading && <Loading />}
      <div className={classes.projectsContainer}>
        <div className={classes.newContainer}>
          <Divider color={'blue'} />
          <AddCard />
          {newP.map((p) => (
            <Card
              key={p._id}
              project={p}
              updateProject={updateP}
              deleteProject={deleteP}
            />
          ))}
        </div>

        <div className={classes.inProgressContainer}>
          <Divider color={'orange'} />
          {inProgressP.map((p) => (
            <Card
              key={p._id}
              project={p}
              updateProject={updateP}
              deleteProject={deleteP}
            />
          ))}
        </div>

        <div className={classes.completedContainer}>
          <Divider color={'green'} />
          {completedP.map((p) => (
            <Card
              key={p._id}
              project={p}
              updateProject={updateP}
              deleteProject={deleteP}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
