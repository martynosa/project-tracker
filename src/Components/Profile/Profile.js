import classes from './Profile.module.css';

import UploadPhoto from './UploadPhoto';
import PasswordChange from './PasswordChange';
import PageHeader from '../Common/PageHeader';

const Profile = () => {
  return (
    <>
      <PageHeader pageTitle={'profile'} />
      <section className={classes.container}>
        <UploadPhoto />
        <PasswordChange />
      </section>
    </>
  );
};

export default Profile;
