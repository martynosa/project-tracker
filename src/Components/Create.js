import { useState } from 'react';

import classes from './Create.module.css';
import PageHeader from './Common/PageHeader';
import InputGroup from './Common/InputGroup';
import Textarea from './Common/Textarea';

const defaultErr = {
  status: false,
  message: '',
};

const Create = () => {
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState(defaultErr);

  const [description, setDescription] = useState('');
  const [descriptionErr, setDescriptionErr] = useState(defaultErr);

  const nameHandler = (e) => {
    const name = e.target.value;
    console.log(name);
  };

  const descriptionHandler = (e) => {
    const description = e.target.value;
    console.log(description);
  };

  return (
    <>
      <PageHeader pageTitle={'create project'} />
      <form className={classes.form}>
        <InputGroup
          label={'Name'}
          type={'text'}
          onChangeHandler={nameHandler}
          error={nameErr}
        />

        <Textarea
          label={'description'}
          onChangeHandler={descriptionHandler}
          error={descriptionErr}
        />
      </form>
    </>
  );
};

export default Create;
