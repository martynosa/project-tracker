import classes from './Profile.module.css';

import UploadPhoto from './UploadPhoto';
import PasswordChange from './PasswordChange';

const Profile = () => {
  return (
    <>
      <section className={classes.container}>
        <div className={classes.forms}>
          <UploadPhoto />
          <PasswordChange />
        </div>
      </section>
    </>
  );
};

export default Profile;
