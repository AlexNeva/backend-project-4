import nock from 'nock';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mkdtemp, readFile } from 'node:fs/promises';
import { beforeEach, expect, test } from '@jest/globals';
import { getFixturePath } from './utils.js';
import downloadHtml from '../src/loaders/htmlLoader.js';

const pageUrl = 'https://ru.hexlet.io/courses';
const htmlFilename = 'ru-hexlet-io-courses.html';
let tempDir;
let html;

beforeEach(async () => {
  tempDir = await mkdtemp(join(tmpdir(), 'page-loader-'));
  html = await readFile(getFixturePath('index.html'), 'utf-8');

  nock(/ru\.hexlet\.io/)
    .get('/courses')
    .reply(200, html);
});

test('check html loading', async () => {
  await downloadHtml(pageUrl, tempDir);
  const downloadingHtml = await readFile(join(tempDir, htmlFilename), 'utf-8');

  expect(downloadingHtml).toEqual(html);
});
