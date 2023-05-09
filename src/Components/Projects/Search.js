import classes from './Search.module.css';
import { searchSVG } from '../../helpers/svgIcons';

const Search = ({ searchHandler }) => {
  return (
    <div className={classes.searchGroup}>
      {searchSVG}
      <input
        className={classes.searchInput}
        placeholder="Search ..."
        onChange={searchHandler}
      />
    </div>
  );
};

export default Search;
