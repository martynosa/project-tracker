const AUTH_URL = 'https://project-tracker-server.up.railway.app/auth';
const PHOTO_URL = 'https://project-tracker-server.up.railway.app/users';
const ITEM_URL = 'https://project-tracker-server.up.railway.app/items';

const DEV_AUTH_URL = 'http://localhost:5000/auth';
const DEV_PHOTO_URL = 'http://localhost:5000/users';
const DEV_ITEM_URL = 'http://localhost:5000/items';

const URL = {
  AUTH_URL,
  PHOTO_URL,
  ITEM_URL,
};

if (process.env.NODE_ENV === 'development') {
  URL.AUTH_URL = DEV_AUTH_URL;
  URL.PHOTO_URL = DEV_PHOTO_URL;
  URL.ITEM_URL = DEV_ITEM_URL;
}

export default URL;
