import { useState, useEffect } from 'react';

import classes from './Projects.module.css';

import Card from './Card';
import Search from './Search';

import URL from '../../helpers/constants';
import useFetch from '../../Hooks/useFetch';
import searchService from '../../helpers/searchService';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState('');

  const { sendRequest } = useFetch();

  const filteredP = searchService(projects, search);

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
    setSearch(e.target.value);
  };

  useEffect(() => {
    const httpConfig = {
      url: `${URL.ITEM_URL}`,
      isAuthorized: true,
    };

    sendRequest(httpConfig).then((data) => {
      setProjects(data);
    });
  }, [sendRequest]);

  return (
    <div className={classes.container}>
      <Search searchHandler={searchHandler} />
      <div className={classes.projectsContainer}>
        <div className={classes.newContainer}>
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
