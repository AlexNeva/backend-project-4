const isAbsoluteUrl = (url) => {
  /* eslint-disable no-unused-vars */

  try {
    const _ = new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

export default isAbsoluteUrl;
