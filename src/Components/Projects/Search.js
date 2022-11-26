import classes from './Search.module.css';

const Search = ({ searchHandler }) => {
  return (
    <div className={classes.searchGroup}>
      <ion-icon name="search"></ion-icon>
      <input
        className={classes.searchInput}
        placeholder="Search ..."
        onChange={searchHandler}
      />
    </div>
  );
};

export default Search;
