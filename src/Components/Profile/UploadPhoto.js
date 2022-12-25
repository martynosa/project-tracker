import classes from './UploadPhoto.module.css';
import Button from '../Common/Button';

import { useNotification } from '../../Contexts/NotificationContext';

import { useAuth } from '../../Contexts/AuthContext';
import URL from '../../environment';
import useFetch from '../../Hooks/useFetch';

const UploadPhoto = () => {
  const { updatePhoto } = useAuth();
  const { sendRequest, isLoading, setIsLoading } = useFetch();

  const { openNotification } = useNotification();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const photo = formData.get('photo');

    if (photo.size === 0) {
      openNotification('fail', 'Image not selected!');
      return;
    }

    try {
      const photoUrl = await sendRequest({
        url: `${URL.AUTH_URL}/uploadPhoto`,
        method: 'POST',
        isAuthenticated: true,
        photo: formData,
      });
      updatePhoto(photoUrl);
      openNotification('success', 'Photo uploaded.');
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', error.message);
    }
  };

  return (
    <form className={classes.uploadPhotoform} onSubmit={onSubmitHandler}>
      <div className={classes.photoInputGroup}>
        <label htmlFor="photo">Select photo</label>
        <input id="photo" type="file" name="photo" />
      </div>
      <Button
        type={'submit'}
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
