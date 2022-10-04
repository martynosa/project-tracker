import { useState } from 'react';

import classes from './Profile.module.css';
import Button from './Common/Button';

import { useNotification } from '../Contexts/NotificationContext';
import { useAuth } from '../Contexts/AuthContext';
import { AUTH_URL } from '../helpers/constants';
import useFetch from '../Hooks/useFetch';

const Profile = () => {
  const { user, updatePhoto } = useAuth();
  const { sendRequest, isLoading } = useFetch();

  const { openNotification } = useNotification();

  const httpConfig = {
    url: `${AUTH_URL}/uploadPhoto`,
    headers: { token: user.token },
    method: 'POST',
  };

  const onUploadPhotoHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const photo = formData.get('photo');

    if (photo.size === 0) {
      openNotification('fail', 'Image not selected!');
      return;
    }

    try {
      const photoUrl = await sendRequest({ ...httpConfig, photo: formData });
      updatePhoto(photoUrl);
      openNotification('success', 'Photo uploaded successfully.');
    } catch (error) {
      openNotification('fail', error.message);
    }
  };

  const onUpdatePasswordHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className={`${classes.mainHeading} mt-32`}>Profile</h1>
      <section className={classes.container}>
        <form
          className={classes.photoUploadform}
          onSubmit={onUploadPhotoHandler}
        >
          <div className={classes.photoInputGroup}>
            <label htmlFor="photo">Click here to select image</label>
            <input id="photo" type="file" name="photo" />
          </div>
          <Button
            text="Upload"
            type="submit"
            color="violet"
            isLoading={isLoading}
            helper={classes.uploadBtn}
          />
        </form>

        <form className={`${classes.passwordForm} mt-48`}>
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
            text="Change password"
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
