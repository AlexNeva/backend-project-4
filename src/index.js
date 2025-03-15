import { resolve } from 'node:path';
import debug from 'debug';
import downloadHtml from './loaders/htmlLoader.js';
import downloadResources from './loaders/resourcesLoader.js';

const log = debug('page-loader');

const pageLoader = (url, dir = process.cwd()) => {
  const dirPath = resolve(dir);

  log('Загрузка страницы');

  return downloadHtml(url, dir)
    .then((pathToHtml) => downloadResources(pathToHtml, url))
    .then(() => console.log(`Page was successfully downloaded into '${dirPath}'`))
    .catch((error) => {
      throw error;
    });
};

export default pageLoader;

// pageLoader('https://portal.hse.ru/format', './downloads');
