import nock from 'nock';
import { readFile } from 'node:fs/promises';
import generateSlug from '../src/generateSlug.js';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPageData } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '../__fixtures__/', filename);

test('generateSlug', () => {
  const url1 = 'https://ru.hexlet.io/courses';
  const expectedFilename1 = 'ru-hexlet-io-courses';
  const url2 = 'https://chatgpt.com/c/671a75be-4474-8006-a54e-e0230bd21a56';
  const expectedFilename2 = 'chatgpt-com-c-671a75be-4474-8006-a54e-e0230bd21a56';
  expect(generateSlug(url1)).toEqual(expectedFilename1);
  expect(generateSlug(url2)).toEqual(expectedFilename2);
});

test('getPageData', async () => {
  const data = await readFile(getFixturePath('page/index.html'), 'utf-8');

  nock(/ru\.hexlet\.io/)
    .get('/courses')
    .reply(200, { data });

  const response = await getPageData('https://ru.hexlet.io/courses');
  expect(response.data).toEqual(data);
});
