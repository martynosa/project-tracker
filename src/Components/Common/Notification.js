import { useNotification } from '../../Contexts/NotificationContext';

import classes from './Notification.module.css';

import { checkmarkSVG, crossSVG } from '../../helpers/svgIcons';

const Notification = () => {
  const { notificationSettings } = useNotification();
  let { isOpen, status, message } = notificationSettings;

  let className = '';
  let icon = null;

  switch (status) {
    case 'success':
      className = `${classes.notification} ${classes.success}`;
      icon = checkmarkSVG;
      break;
    case 'fail':
      className = `${classes.notification} ${classes.fail}`;
      icon = crossSVG;
      break;
    default:
      className = '';
      icon = null;
  }

  return (
    <div
      className={
        isOpen
          ? `${classes.notificationContainer} ${classes.show}`
          : classes.notificationContainer
      }
    >
      <div className={className}>
        {icon}
        {message}
      </div>
    </div>
  );
};

export default Notification;
