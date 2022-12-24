const changeTheme = (isDark) => {
  if (isDark) {
    document.body.classList.remove('lightTheme');
    document.body.classList.add('darkTheme');
  } else {
    document.body.classList.remove('darkTheme');
    document.body.classList.add('lightTheme');
  }
};

export default changeTheme;
