export const emailValidator = (email) => {
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: true, message: 'Invalid email address!' };
  }
  return { status: false, message: null };
};

export const nameValidator = (name) => {
  if (!name || name.length < 3) {
    return {
      status: true,
      message: 'Name with 3 or more characters required!',
    };
  }
  return { status: false, message: null };
};

export const passwordValidator = (password) => {
  if (!password || password.length < 6) {
    return {
      status: true,
      message: 'Password with 6 or more characters required!',
    };
  }
  return { status: false, message: null };
};

export const rePasswordValidator = (password, rePassword) => {
  if (!rePassword || password !== rePassword) {
    return {
      status: true,
      message: 'Repeat password does not match password!',
    };
  }
  return { status: false, message: null };
};
