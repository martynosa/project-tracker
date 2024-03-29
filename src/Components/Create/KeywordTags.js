import { useId } from 'react';

import classes from './KeywordTags.module.css';
import Tag from '../Common/Tag';

const KeywordTags = ({ keywords, error, removeKeyword }) => {
  const id = useId();

  const errorStatus = error?.status || false;
  const errorMessage = error?.message || '';

  return (
    <div className={classes.keywordsGroup}>
      <ul>
        {keywords.map((k, index) => (
          <Tag
            key={`${id}-${index}`}
            keyword={k}
            removeKeyword={removeKeyword}
          />
        ))}
      </ul>
      {errorStatus && <p className={classes.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default KeywordTags;
