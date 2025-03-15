const networkErrors = ['ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT', 'EAI_AGAIN'];
const fileErrors = ['ENOENT', 'EACCES', 'EISDIR', 'ENOTDIR', 'ENAMETOOLONG'];

export const isNetworkError = (err) => {
  return networkErrors.includes(err.code);
};

export const isFileError = (err) => {
  return fileErrors.includes(err.code);
};
