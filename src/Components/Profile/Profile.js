import classes from './Profile.module.css';

import UploadPhoto from './UploadPhoto';
import PasswordChange from './PasswordChange';
import Divider from '../Common/Divider';

const Profile = () => {
  return (
    <>
      <section className={classes.container}>
        <div className={classes.forms}>
          <Divider color={'violet'} />
          <UploadPhoto />
          <Divider color={'orange'} />
          <PasswordChange />
        </div>
      </section>
    </>
  );
};

export default Profile;
