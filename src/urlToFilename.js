const urlToFilename = (url, ext = 'html') => {
  const urlObj = new URL(url);
  const formattedUrl = `${urlObj.host}${urlObj.pathname}`.replace(/[\/]/g, '-').replace(/\./g, '-');
  return `${formattedUrl}.${ext}`;
};

export default urlToFilename;
