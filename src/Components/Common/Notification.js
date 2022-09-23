import { useNotification } from '../../Contexts/NotificationContext';
import classes from './Notification.module.css';

const Notification = () => {
  const { notificationSettings } = useNotification();
  let { isOpen, status, message } = notificationSettings;

  let className = '';
  let icon = null;

  if (status === 'success') {
    className = `${classes.notification} ${classes.success}`;
    icon = <ion-icon name="checkmark"></ion-icon>;
  }

  if (status === 'fail') {
    className = `${classes.notification} ${classes.fail}`;
    icon = <ion-icon name="close"></ion-icon>;
  }

  if (isOpen) {
    return (
      <div className={className}>
        {icon}
        {message}
      </div>
    );
  }

  return;
};

export default Notification;
