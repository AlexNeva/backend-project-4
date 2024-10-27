import nock from 'nock';
import { readFile } from 'node:fs/promises';
import { getPageData } from '../src/index.js';
import { getFixturePath } from './utils.js';

test('response with code 200', async () => {
  const data = await readFile(getFixturePath('index.html'), 'utf-8');

  nock(/ru\.hexlet\.io/)
    .get('/courses')
    .reply(200, { data });

  const response = await getPageData('https://ru.hexlet.io/courses');
  expect(response.data).toEqual(data);
});

test('response with error code', async () => {
  nock(/ru\.hexlet\.io/)
    .get('/courses')
    .reply(404);

  await expect(getPageData('https://ru.hexlet.io/courses')).rejects.toThrow();
});
