const HOST = "https://project-tracker-server.onrender.com/";

const AUTH_URL = `${HOST}/auth`;
const PHOTO_URL = `${HOST}/users`;
const ITEM_URL = `${HOST}/items`;

const DEV_AUTH_URL = "http://localhost:5000/auth";
const DEV_PHOTO_URL = "http://localhost:5000/users";
const DEV_ITEM_URL = "http://localhost:5000/items";

const URL = {
  AUTH_URL,
  PHOTO_URL,
  ITEM_URL,
};

if (process.env.NODE_ENV === "development") {
  URL.AUTH_URL = DEV_AUTH_URL;
  URL.PHOTO_URL = DEV_PHOTO_URL;
  URL.ITEM_URL = DEV_ITEM_URL;
}

export default URL;
