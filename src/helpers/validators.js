export const emailValidator = (email) => {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: true, message: 'Invalid email address!' };
  }
  return { status: false, message: '' };
};

export const passwordValidator = (password) => {
  if (password.length < 6) {
    return {
      status: true,
      message: 'Password with 6 or more characters required!',
    };
  }
  return { status: false, message: '' };
};
