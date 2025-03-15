import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import api from '../api/index.js';
import generateSlug from '../utils/generateSlug.js';

const downloadHtml = (url, dir) => {
  const urlObj = new URL(url);
  const formattedUrl = `${urlObj.hostname}${urlObj.pathname === '/' ? '' : urlObj.pathname}`;

  const filePath = resolve(dir, `${generateSlug(formattedUrl)}.html`);

  return api
    .get(url)
    .then((response) => response.data)
    .then((html) => writeFile(filePath, html))
    .then(() => filePath)
    .catch((error) => {
      throw error;
    });
};

export default downloadHtml;
