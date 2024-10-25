import axios from 'axios';
import { writeFile } from 'node:fs/promises';
import generateSlug from './generateSlug.js';
import { resolve } from 'node:path';

export const getPageData = (url) =>
  axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.message);
    });

const pageLoader = (url, dir = process.cwd()) => {
  const filePath = resolve(dir, `${generateSlug(url)}.html`);

  getPageData(url)
    .then((data) => writeFile(filePath, data))
    .then(() => console.log(`Page was successfully downloaded into '${filePath}'`))
    .catch((error) => console.error(error));
};

export default pageLoader;
