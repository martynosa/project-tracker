import classes from './Profile.module.css';

import UploadPhoto from './UploadPhoto';
import PasswordChange from './PasswordChange';

const Profile = () => {
  return (
    <>
      <section className={classes.container}>
        <UploadPhoto />
        <PasswordChange />
      </section>
    </>
  );
};

export default Profile;
