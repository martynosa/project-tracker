import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import classes from './Details.module.css';
import PageTitle from '../Common/PageTitle';
import DetailsContainer from './Containers/DetailsContainer/DetailsContainer';
import DeleteDialog from './DeleteDialog';
import TasksContainer from './Containers/TasksCointainer/TasksContainer';
import { dividerColorPicker } from '../../helpers/misc';

import URL from '../../environment';
import useFetch from '../../Hooks/useFetch';

import { useNotification } from '../../Contexts/NotificationContext';

const Details = () => {
  const { id } = useParams();
  const [project, setProject] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const { sendRequest, isLoading, setIsLoading } = useFetch();
  const { openNotification } = useNotification();

  const openModalHandler = () => setIsModalOpen(true);
  const closeModalHandler = () => setIsModalOpen(false);

  const deleteProjectHandler = async () => {
    try {
      await sendRequest({
        url: `${URL.ITEM_URL}/${id}`,
        method: 'DELETE',
        isAuthenticated: true,
      });
      navigate('/projects');
      openNotification('success', 'Project deleted.');
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  useEffect(() => {
    sendRequest({
      url: `${URL.ITEM_URL}/${id}`,
      isAuthenticated: true,
    })
      .then((data) => setProject(data))
      .catch((error) => {
        setIsLoading(false);
        navigate('/projects');
        openNotification('fail', error.message);
      });
  }, [id, openNotification, navigate, sendRequest, setIsLoading]);

  return (
    <>
      <DeleteDialog
        isModalOpen={isModalOpen}
        closeModalHandler={closeModalHandler}
        deleteHandler={deleteProjectHandler}
        isLoading={isLoading}
      />

      <div className={classes.container}>
        <PageTitle color={dividerColorPicker(project)}>Details</PageTitle>

        <DetailsContainer
          project={project}
          openModalHandler={openModalHandler}
        />

        <TasksContainer project={project} setProject={setProject} />
      </div>
    </>
  );
};

export default Details;
