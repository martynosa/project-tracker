export const defaultErr = {
  status: false,
  message: '',
};

export const emailValidator = (email) => {
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: true, message: 'Invalid email address!' };
  }
  return defaultErr;
};

export const nameValidator = (name) => {
  if (!name || name.length < 3) {
    return {
      status: true,
      message: 'Name with 3 or more characters required!',
    };
  }
  return defaultErr;
};

export const passwordValidator = (password) => {
  if (!password || password.length < 6) {
    return {
      status: true,
      message: 'Password with 6 or more characters required!',
    };
  }
  return defaultErr;
};

export const rePasswordValidator = (password, rePassword) => {
  if (!rePassword || password !== rePassword) {
    return {
      status: true,
      message: 'Repeat password does not match password!',
    };
  }
  return defaultErr;
};

export const keywordValidator = (keyword) => {
  if (!keyword || keyword.length < 3) {
    return {
      status: true,
      message: 'Keyword with 3 or more characters required!',
    };
  }
  return defaultErr;
};

export const keywordsValidator = (keywordArr) => {
  if (keywordArr.length <= 0) {
    return {
      status: true,
      message: 'Add 1 to 5 keywords!',
    };
  }
  return defaultErr;
};

export const descriptionValidator = (descritpion) => {
  if (!descritpion || descritpion.length < 10) {
    return {
      status: true,
      message: 'Descritpion with 10 or more characters required!',
    };
  }
  return defaultErr;
};
