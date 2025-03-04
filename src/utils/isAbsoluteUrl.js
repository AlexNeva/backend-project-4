const isAbsoluteUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch () {
    return false;
  }
};

export default isAbsoluteUrl;
