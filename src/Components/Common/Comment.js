import classes from './Comment.module.css';

const Comment = ({ children }) => {
  return <p className={classes.comment}>{children}</p>;
};

export default Comment;
