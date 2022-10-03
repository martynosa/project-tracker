import Button from './Common/Button';
import classes from './Profile.module.css';

const Profile = () => {
  const isLoading = false;

  const onUploadPhotoHandler = (e) => {
    e.preventDefault();
  };

  const onUpdatePasswordHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className={`${classes.mainHeading} mt-32`}>Profile</h1>
      <section className={classes.container}>
        <form className={classes.photoUploadform}>
          <div className={classes.photoInputGroup}>
            <label htmlFor="photoInput">Profile photo</label>
            <input id="photoInput" type="file" />
          </div>
          <Button
            text="Upload"
            type="submit"
            color="violet"
            onClickHandler={onUploadPhotoHandler}
            isLoading={isLoading}
            helper={classes.uploadBtn}
          />
        </form>

        <form className={`${classes.passwordForm} mt-32`}>
          <div className={`${classes.passwordInputGroup} mb-24`}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" />
          </div>
          <div className={`${classes.passwordInputGroup} mb-24`}>
            <label htmlFor="newPassword">New password</label>
            <input id="newPassword" type="password" />
          </div>
          <div className={`${classes.passwordInputGroup} mb-24`}>
            <label htmlFor="newRepPassword">Repeat new password</label>
            <input id="newRepPassword" type="password" />
          </div>
          <Button
            text="Update"
            type="submit"
            color="green"
            onClickHandler={onUpdatePasswordHandler}
            isLoading={isLoading}
          />
        </form>
      </section>
    </>
  );
};

export default Profile;
