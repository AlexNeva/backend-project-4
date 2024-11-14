import { copyFile, mkdtemp, readFile } from 'node:fs/promises';
import { getFixturePath, normalizeHtml } from './utils.js';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import nock from 'nock';
import { downloadResources } from '../src/loaders/resourcesLoader.js';

const pageUrl = 'https://ru.hexlet.io/courses';
let tempDir;

beforeEach(async () => {
  tempDir = await mkdtemp(join(tmpdir(), 'page-loader-'));
  const sourcePath = getFixturePath('index.html');
  const destinationPath = join(tempDir, 'ru-hexlet-io-courses.html');
  await copyFile(sourcePath, destinationPath);
});

test('download resources', async () => {
  const pathToHtml = join(tempDir, 'ru-hexlet-io-courses.html');
  const assetsPath = join(tempDir, 'ru-hexlet-io-courses_files');

  const expectedImg = await readFile(getFixturePath('assets/nodejs.png'));

  nock(/ru\.hexlet\.io/)
    .get('/assets/professions/nodejs.png')
    .reply(200, expectedImg);

  await downloadResources(pathToHtml, pageUrl);

  const receivedImg = await readFile(
    join(assetsPath, 'ru-hexlet-io-assets-professions-nodejs.png')
  );

  const changedHtml = await readFile(join(tempDir, 'ru-hexlet-io-courses.html'), 'utf-8');
  const expectedHtml = await readFile(getFixturePath('changed.html'), 'utf-8');

  expect(Buffer.compare(receivedImg, expectedImg)).toEqual(0);
  expect(normalizeHtml(changedHtml)).toEqual(normalizeHtml(expectedHtml));
});
