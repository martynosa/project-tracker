import { useId } from 'react';

import classes from './KeywordTags.module.css';
import Tag from './Tag';

const KeywordTags = ({ keywords, removeKeyword }) => {
  const id = useId();

  return (
    <div className={`${classes.keywordTagGroup} mb-24`}>
      {keywords.map((k, index) => (
        <Tag key={`${id}-${index}`} keyword={k} removeKeyword={removeKeyword} />
      ))}
    </div>
  );
};

export default KeywordTags;
