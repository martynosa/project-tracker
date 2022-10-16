import { useState } from 'react';

import classes from './Create.module.css';
import {
  defaultErr,
  descriptionValidator,
  nameValidator,
} from '../../helpers/validators';
import InputGroup from '../Common/InputGroup';
import DescriptionGroup from './DescriptionGroup';
import KeywordsGroup from './KeywordsGroup';
import Button from '../Common/Button';

const Create = () => {
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [description, setDescription] = useState('');

  const [nameErr, setNameErr] = useState(defaultErr);
  const [keywordsErr, setKeywordsErr] = useState(defaultErr);
  const [descriptionErr, setDescriptionErr] = useState(defaultErr);

  const nameHandler = (e) => {
    const name = e.target.value.trim();
    setNameErr(nameValidator(name));
    setName(name);
  };

  const descriptionHandler = (e) => {
    const description = e.target.value.trim();
    setDescriptionErr(descriptionValidator(description));
    setDescription(description);
  };

  const addKeyword = (keyword) => {
    setKeywords((state) => {
      return [...state, keyword];
    });
  };

  const onCreateHandler = (e) => {
    e.preventDefault();

    const project = {
      name,
      keywords,
      description,
    };

    console.log(project);
  };

  return (
    <>
      <form className={classes.form}>
        <InputGroup
          label={'Name'}
          type={'text'}
          onChangeHandler={nameHandler}
          error={nameErr}
        />

        <KeywordsGroup addKeyword={addKeyword} />

        {keywords.map((k) => {
          return <p>{k}</p>;
        })}

        <DescriptionGroup
          label={'description'}
          onChangeHandler={descriptionHandler}
          error={descriptionErr}
        />

        <Button
          type={'submit'}
          color={'green'}
          onClickHandler={onCreateHandler}
        >
          Create
        </Button>
      </form>
    </>
  );
};

export default Create;
