import { useState } from 'react';

import classes from './KeywordsGroup.module.css';
import Button from '../Common/Button';
import { defaultErr, keywordValidator } from '../../helpers/validators';

const KeywordsGroup = ({ addKeyword }) => {
  const [keyword, setKeyword] = useState('');
  const [keywordErr, setKeywordErr] = useState(defaultErr);

  const onKeywordChange = (e) => {
    const keyword = e.target.value.trim();
    setKeywordErr(keywordValidator(keyword));
    setKeyword(keyword);
  };

  const onClickHandler = () => {
    const keywordValidationErr = keywordValidator(keyword);
    if (keywordValidationErr.status) {
      setKeywordErr(keywordValidationErr);
      return;
    }
    addKeyword(keyword);
    setKeyword('');
  };

  return (
    <div className="mb-24">
      <label htmlFor="keyword">Keyword</label>
      <div className={`${classes.keywordsGroup} mb-12`}>
        <input
          id="keyword"
          type="test"
          onChange={onKeywordChange}
          className={keywordErr.status ? classes.errorInput : undefined}
          value={keyword}
        />
        <Button
          type={'button'}
          color={'violet'}
          onClickHandler={onClickHandler}
          helperClass={classes.keywordBtn}
        >
          <ion-icon name="add"></ion-icon> Add
        </Button>
      </div>
      {keywordErr.status && (
        <p className={classes.errorMessage}>{keywordErr.message}</p>
      )}
    </div>
  );
};

export default KeywordsGroup;
