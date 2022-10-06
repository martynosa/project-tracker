import classes from './Profile.module.css';

import UploadPhoto from './UploadPhoto';
import PasswordChange from './PasswordChange';

const Profile = () => {
  return (
    <>
      <h1 className={`${classes.mainHeading} mt-32`}>Profile</h1>
      <section className={classes.container}>
        <UploadPhoto />
        <PasswordChange />
      </section>
    </>
  );
};

export default Profile;
