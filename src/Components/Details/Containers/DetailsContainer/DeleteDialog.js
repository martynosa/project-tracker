import { useRef, useEffect } from 'react';

import classes from './DeleteDialog.module.css';
import Button from '../../../Common/Button';

const DeleteDialog = ({
  isModalOpen,
  closeModalHandler,
  deleteHandler,
  isLoading,
}) => {
  const HTMLDialog = useRef();

  useEffect(() => {
    isModalOpen ? HTMLDialog.current.showModal() : HTMLDialog.current.close();
  }, [isModalOpen]);

  return (
    <dialog ref={HTMLDialog} className={classes.dialog}>
      <p>Are you sure you want to delete the project?</p>
      <div>
        <Button color={'grey'} onClick={closeModalHandler}>
          close
        </Button>
        <Button color={'red'} onClick={deleteHandler} isLoading={isLoading}>
          delete
        </Button>
      </div>
    </dialog>
  );
};

export default DeleteDialog;
