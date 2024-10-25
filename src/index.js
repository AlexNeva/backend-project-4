import axios from 'axios';
import { writeFile } from 'node:fs/promises';
import urlToFilename from './urlToFilename.js';
import { resolve } from 'node:path';

export const getPageData = (url) => axios.get(url).then((response) => response.data);

const pageLoader = (url, dir = process.cwd()) => {
  const filePath = resolve(dir, urlToFilename(url));

  getPageData(url)
    .then((data) => writeFile(filePath, data))
    .then(() => console.log(`Page was successfully downloaded into '${filePath}'`))
    .catch((error) => console.error(error));
};

export default pageLoader;
