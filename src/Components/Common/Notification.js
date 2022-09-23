import { useNotification } from '../../Contexts/NotificationContext';
import classes from './Notification.module.css';

const Notification = () => {
  const { notificationSettings } = useNotification();
  let { isOpen, status, message } = notificationSettings;

  let className = '';
  let icon = null;

  switch (status) {
    case 'success':
      className = `${classes.notification} ${classes.success}`;
      icon = <ion-icon name="checkmark"></ion-icon>;
      break;
    case 'fail':
      className = `${classes.notification} ${classes.fail}`;
      icon = <ion-icon name="close"></ion-icon>;
      break;
    default:
      className = '';
      icon = null;
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
