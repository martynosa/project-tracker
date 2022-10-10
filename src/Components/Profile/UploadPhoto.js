import classes from './UploadPhoto.module.css';
import Button from '../Common/Button';

import { useNotification } from '../../Contexts/NotificationContext';

import { useAuth } from '../../Contexts/AuthContext';
import { AUTH_URL } from '../../helpers/constants';
import useFetch from '../../Hooks/useFetch';

const UploadPhoto = () => {
  const { user, updatePhoto } = useAuth();
  const { sendRequest, isLoading, setIsLoading } = useFetch();

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
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  return (
    <form className={classes.uploadPhotoform} onSubmit={onUploadPhotoHandler}>
      <div className={classes.photoInputGroup}>
        <label htmlFor="photo">Click here to select image</label>
        <input id="photo" type="file" name="photo" />
      </div>
      <Button
        type="submit"
        color="violet"
        isLoading={isLoading}
        helperClass={classes.uploadBtn}
      >
        Upload
      </Button>
    </form>
  );
};

export default UploadPhoto;
