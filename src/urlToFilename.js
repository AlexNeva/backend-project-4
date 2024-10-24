const urlToFilename = (url) => {
  const urlObj = new URL(url);
  const formattedUrl = `${urlObj.host}${urlObj.pathname}`.replace(/[\/]/g, '-').replace(/\./g, '-');
  return `${formattedUrl}.html`;
};

export default urlToFilename;
