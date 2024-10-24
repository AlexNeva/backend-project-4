import nock from 'nock';
import { readFile } from 'node:fs/promises';
import urlToFilename from '../src/urlToFilename.js';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPageData } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '../__fixtures__/', filename);

test('urlToFilename', () => {
  const url = 'https://ru.hexlet.io/courses';
  const expectedFilename = 'ru-hexlet-io-courses.html';
  expect(urlToFilename(url)).toEqual(expectedFilename);
});

test('getPageData', async () => {
  const data = await readFile(getFixturePath('page/index.html'), 'utf-8');

  nock(/ru\.hexlet\.io/)
    .get('/courses')
    .reply(200, { data });

  const response = await getPageData('https://ru.hexlet.io/courses');
  expect(response.data).toEqual(data);
});
