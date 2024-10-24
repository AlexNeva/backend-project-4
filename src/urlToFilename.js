const urlToFilename = (url, ext = 'html') => {
  const urlObj = new URL(url);
  const formattedUrl = `${urlObj.host}${urlObj.pathname}`.replace(/[^a-zA-Z0-9]/g, '-');
  return `${formattedUrl}.${ext}`;
};

export default urlToFilename;
