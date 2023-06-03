import { createContext, useContext, useState } from 'react';

const projectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

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

  const value = { projects, setProjects, updateProject, deleteProject };

  return (
    <projectsContext.Provider value={value}>
      {children}
    </projectsContext.Provider>
  );
};

export const useProjects = () => {
  return useContext(projectsContext);
};
