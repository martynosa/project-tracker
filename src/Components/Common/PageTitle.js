import classes from './PageTitle.module.css';

const PageTitle = ({ children, color }) => {
  return (
    <h1 className={classes.pageTitle}>
      <div className={classes[color]}></div>
      {children}
      <div className={classes[color]}></div>
    </h1>
  );
};
export default PageTitle;
