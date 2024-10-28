import axios from 'axios';
import generateSlug from '../utils/generateSlug.js';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';

export const downloadHtml = (url, dir) => {
  const urlObj = new URL(url);
  const formattedUrl = `${urlObj.hostname}${urlObj.pathname === '/' ? '' : urlObj.pathname}`;

  const filePath = resolve(dir, `${generateSlug(formattedUrl)}.html`);

  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.message);
    })
    .then((html) => writeFile(filePath, html))
    .then(() => filePath);
};
