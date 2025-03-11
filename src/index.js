import { downloadHtml } from './loaders/htmlLoader.js';
import { resolve } from 'node:path';
import { downloadResources } from './loaders/resourcesLoader.js';
import debug from 'debug';

const log = debug('page-loader');

const pageLoader = (url, dir = process.cwd()) => {
  const dirPath = resolve(dir);

  log('Загрузка страницы');

  downloadHtml(url, dir)
    .then((pathToHtml) => downloadResources(pathToHtml, url))
    .then(() => console.log(`Page was successfully downloaded into '${dirPath}'`))
    .catch((error) => console.error(error));
};

export default pageLoader;

pageLoader('https://portal.hse.ru/format', './downloads');
