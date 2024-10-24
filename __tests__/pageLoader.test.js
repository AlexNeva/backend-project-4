import { mkdtemp } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import urlToFilename from '../src/urlToFilename.js';

// let tempDir;

// beforeEach(async () => {
//   tempDir = await mkdtemp(join(tmpdir(), 'page-loader-'));
// });

test('urlToFilename', () => {
  const url = 'https://ru.hexlet.io/courses';
  const expectedFilename = 'ru-hexlet-io-courses.html';
  expect(urlToFilename(url)).toEqual(expectedFilename);
});
