import classes from './LoadingContainer.module.css';

import Divider from '../../Common/Divider';
import LoadingCard from '../Cards/LoadingCard';
import AddCard from '../Cards/AddCard';

const LoadingContainer = () => {
  return (
    <div className={classes.container}>
      <div>
        <Divider color={'blue'} />
        <AddCard />
        <LoadingCard />
        <LoadingCard />
      </div>

      <div>
        <Divider color={'orange'} />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>

      <div>
        <Divider color={'green'} />
        <LoadingCard />
      </div>
    </div>
  );
};

export default LoadingContainer;
