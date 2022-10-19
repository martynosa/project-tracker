import { useState } from 'react';

import classes from './KeywordGroup.module.css';
import Button from '../Common/Button';
import {
  defaultErr,
  keywordValidator,
  dupKeywordValidator,
} from '../../helpers/validators';

const KeywordGroup = ({ addKeyword, keywords }) => {
  const [keyword, setKeyword] = useState('');
  const [keywordErr, setKeywordErr] = useState(defaultErr);

  const onKeywordChange = (e) => {
    const keyword = e.target.value.trim();
    setKeywordErr(keywordValidator(keyword));
    setKeyword(keyword);
  };

  const onAddHandler = () => {
    const keywordValidationErr = keywordValidator(keyword);
    const dupKeywordValidationErr = dupKeywordValidator(keyword, keywords);
    if (keywordValidationErr.status) {
      setKeywordErr(keywordValidationErr);
      return;
    }

    if (dupKeywordValidationErr.status) {
      setKeywordErr(dupKeywordValidationErr);
      return;
    }

    addKeyword(keyword);
    setKeyword('');
  };

  return (
    <div className={classes.keywordGroup}>
      <label htmlFor="keyword">Keyword</label>
      <input
        id="keyword"
        type="test"
        onChange={onKeywordChange}
        className={keywordErr.status ? classes.errorInput : undefined}
        value={keyword}
      />
      {keywordErr.status && (
        <p className={classes.errorMessage}>{keywordErr.message}</p>
      )}
      <Button
        color={'violet'}
        onClickHandler={onAddHandler}
        helperClass={classes.keywordBtn}
      >
        <ion-icon name="add"></ion-icon> Add
      </Button>
    </div>
  );
};

export default KeywordGroup;
