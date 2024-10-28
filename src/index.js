import { downloadHtml } from './loaders/htmlLoader.js';
import { resolve } from 'node:path';

const pageLoader = (url, dir = process.cwd()) => {
  const dirPath = resolve(dir);

  downloadHtml(url, dir)
    .then(() => console.log(`Page was successfully downloaded into '${dirPath}'`))
    .catch((error) => console.error(error));
};

export default pageLoader;

pageLoader('https://portal.hse.ru/format', './downloads');
