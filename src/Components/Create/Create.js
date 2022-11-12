import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

import { useNotification } from '../../Contexts/NotificationContext';
import { ITEM_URL } from '../../helpers/constants';
import useFetch from '../../Hooks/useFetch';

const Create = () => {
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [description, setDescription] = useState('');

  const [nameErr, setNameErr] = useState(defaultErr);
  const [keywordsErr, setKeywordsErr] = useState(defaultErr);
  const [descriptionErr, setDescriptionErr] = useState(defaultErr);

  const { sendRequest, isLoading, setIsLoading } = useFetch();

  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const httpConfig = {
    url: `${ITEM_URL}`,
    method: 'POST',
    body: { name, keywords, description },
    isAuthorized: true,
  };

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

  const onSumbitHandler = async (e) => {
    e.preventDefault();
    const nameValidationErr = nameValidator(name);
    const keywordsValidationErr = keywordsValidator(keywords);
    const descriptionValidationErr = descriptionValidator(description);
    setNameErr(nameValidationErr);
    setKeywordsErr(keywordsValidationErr);
    setDescriptionErr(descriptionValidationErr);

    if (
      nameValidationErr.status ||
      keywordsValidationErr.status ||
      descriptionValidationErr.status
    )
      return;

    try {
      const createdItem = await sendRequest(httpConfig);
      navigate('/projects');
      openNotification('success', `${createdItem.name} successfully created.`);
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={onSumbitHandler}>
        <InputGroup
          label={'name'}
          onChangeHandler={nameHandler}
          error={nameErr}
        />

        <KeywordGroup addKeyword={addKeyword} keywords={keywords} />

        <KeywordTags
          keywords={keywords}
          error={keywordsErr}
          removeKeyword={removeKeyword}
        />

        <DescriptionGroup
          onChangeHandler={descriptionHandler}
          error={descriptionErr}
        />

        <Button type={'submit'} color={'green'} isLoading={isLoading}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default Create;
