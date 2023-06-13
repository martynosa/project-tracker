import { useNavigate } from 'react-router-dom';

import classes from './ErrorRoute.module.css';

import Button from '../Common/Button';

import { useAuth } from '../../Contexts/AuthContext';

const ErrorRoute = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      return navigate('/projects');
    }
    navigate('/');
  };

  return (
    <section className={classes.container}>
      <div>
        <h1>
          <span>404</span> page not found!
        </h1>
        <Button onClick={onClickHandler} color={'orange'}>
          back
        </Button>
      </div>
    </section>
  );
};
export default ErrorRoute;
