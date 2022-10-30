import classes from './Tag.module.css';

const Tag = ({ keyword, removeKeyword }) => {
  let className = classes.tag;
  switch (keyword.length) {
    case 3:
      className = `${className} ${classes.orange}`;
      break;
    case 4:
      className = `${className} ${classes.lime}`;
      break;
    case 5:
      className = `${className} ${classes.teal}`;
      break;
    case 6:
      className = `${className} ${classes.blue}`;
      break;
    case 7:
      className = `${className} ${classes.violet}`;
      break;
    case 8:
      className = `${className} ${classes.red}`;
      break;
    case 9:
      className = `${className} ${classes.grape}`;
      break;
    case 10:
      className = `${className} ${classes.indigo}`;
      break;
    case 11:
      className = `${className} ${classes.cyan}`;
      break;
    case 12:
      className = `${className} ${classes.green}`;
      break;
    case 13:
      className = `${className} ${classes.yellow}`;
      break;
    default:
      className = `${className} ${classes.pink}`;
  }

  const onRemoveHandler = (e) => {
    const keyword = e.target.textContent;
    if (!removeKeyword) return;
    removeKeyword(keyword);
  };

  return (
    <span className={className} onClick={onRemoveHandler}>
      {keyword}
    </span>
  );
};

export default Tag;
