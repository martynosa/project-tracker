import { largeExclamationMark } from '../../helpers/svgIcons';
import classes from './Comment.module.css';

const Comment = ({ children }) => {
  return (
    <p className={classes.comment}>
      {largeExclamationMark}
      {children}
    </p>
  );
};

export default Comment;
