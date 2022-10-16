import { useState } from 'react';

import classes from './Create.module.css';
import {
  defaultErr,
  descriptionValidator,
  keywordsValidator,
  nameValidator,
} from '../../helpers/validators';
import InputGroup from '../Common/InputGroup';
import DescriptionGroup from './DescriptionGroup';
import KeywordGroup from './KeywordGroup';
import Button from '../Common/Button';
import KeywordTags from './KeywordTags';

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

  const removeKeyword = (keyword) => {
    setKeywords((state) => {
      return state.filter((k) => k !== keyword);
    });
  };

  const onCreateHandler = () => {
    const nameValidationErr = nameValidator(name);
    const keywordsValidationErr = keywordsValidator(keywords);
    const descriptionValidationErr = descriptionValidator(description);
    setNameErr(nameValidationErr);
    setKeywordsErr(keywordsValidationErr);
    setDescriptionErr(descriptionValidationErr);

    const project = {
      name,
      keywords,
      description,
    };

    if (
      nameValidationErr.status ||
      keywordsValidationErr.status ||
      descriptionValidationErr.status
    )
      return;

    console.log('created ->', project);
  };

  return (
    <>
      <form className={classes.form}>
        <InputGroup
          label={'name'}
          onChangeHandler={nameHandler}
          error={nameErr}
        />

        <KeywordGroup addKeyword={addKeyword} />

        <KeywordTags
          keywords={keywords}
          error={keywordsErr}
          removeKeyword={removeKeyword}
        />

        <DescriptionGroup
          onChangeHandler={descriptionHandler}
          error={descriptionErr}
        />

        <Button color={'green'} onClickHandler={onCreateHandler}>
          Create
        </Button>
      </form>
    </>
  );
};

export default Create;
