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

export const rePasswordValidator = (password, rePassword) => {
  if (!rePassword || password !== rePassword) {
    return {
      status: true,
      message: 'Repeat password does not match password!',
    };
  }
  return defaultErr;
};

export const dupKeywordValidator = (keyword, keywords) => {
  if (keywords.includes(keyword)) {
    return {
      status: true,
      message: 'Duplicate keyword!',
    };
  }
  return defaultErr;
};

export const keywordsValidator = (keywords) => {
  if (keywords.length <= 0 || keywords.length > 5) {
    return {
      status: true,
      message: 'Add 1 to 5 keywords!',
    };
  }
  return defaultErr;
};

export const lengthValidator = (value, length) => {
  if (!value || value.length < length) {
    return {
      status: true,
      message: `${length} or more characters required!`,
    };
  }
  return defaultErr;
};
