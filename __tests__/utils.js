import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFixturePath = (filename) => resolve(__dirname, '../__fixtures__/', filename);

export const normalizeHtml = (html) => {
  const $ = cheerio.load(html);
  return $.html().trim();
};
