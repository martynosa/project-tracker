import { useNotification } from '../../Contexts/NotificationContext';

import classes from './Notification.module.css';

import { checkmarkSVG, crossSVG } from '../../helpers/svgIcons';

const Notification = () => {
  const { notificationSettings } = useNotification();
  let { isOpen, status, message } = notificationSettings;

  let className = status === 'success' ? classes.success : classes.fail;
  let icon = status === 'success' ? checkmarkSVG : crossSVG;

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
