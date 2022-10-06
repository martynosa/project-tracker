import classes from './PageHeader.module.css';

const PageHeader = ({ pageTitle }) => {
  return <h1 className={`${classes.mainHeading} mt-32`}>{pageTitle}</h1>;
};

export default PageHeader;
