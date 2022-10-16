import { useId } from 'react';

import classes from './KeywordTags.module.css';
import Tag from './Tag';

const KeywordTags = ({ keywords, error, removeKeyword }) => {
  const id = useId();

  const errorStatus = error?.status || false;
  const errorMessage = error?.message || '';

  return (
    <div className={`${classes.keywordTagGroup} mb-24`}>
      <div className={classes.keywordTagList}>
        {keywords.map((k, index) => (
          <Tag
            key={`${id}-${index}`}
            keyword={k}
            removeKeyword={removeKeyword}
          />
        ))}
      </div>
      {errorStatus && (
        <p className={`${classes.errorMessage} mt-03`}>{errorMessage}</p>
      )}
    </div>
  );
};

export default KeywordTags;
