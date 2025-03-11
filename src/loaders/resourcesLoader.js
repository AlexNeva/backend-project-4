import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, parse, resolve } from 'node:path';
import * as cheerio from 'cheerio';
import api from '../api/index.js';
import generateSlug from '../utils/generateSlug.js';
import { isLocalLink } from '../utils/isLocalLink.js';
import isAbsoluteUrl from '../utils/isAbsoluteUrl.js';

const createResourceFilename = (path, hostname) => {
  const normalizePath = isAbsoluteUrl(path) ? new URL(path).pathname : path;
  const { dir, ext, name } = parse(normalizePath);
  const resourceFilename = `${generateSlug(join(hostname, dir, name))}${ext || '.html'}`;

  return resourceFilename;
};

const loadResource = (pathToLoad, pathToWrite) =>
  api
    .get(pathToLoad, { responseType: 'arraybuffer' })
    .then((response) => writeFile(pathToWrite, response.data))
    .catch(() => {
      throw `Resource loading by "${pathToLoad}" is failed`;
    });

const mapping = {
  img: 'src',
  script: 'src',
  link: 'href',
};
const getAttrByTagname = (tagname) => mapping[tagname];

export const downloadResources = (pathToHtml, pageUrl) => {
  const { dir, name } = parse(pathToHtml);
  const assetsFoldername = `${name}_files`;
  const assetsPath = resolve(dir, assetsFoldername);
  const { origin, hostname } = new URL(pageUrl);

  let $;

  return mkdir(assetsPath, { recursive: true })
    .then(() => readFile(pathToHtml, 'utf-8'))
    .then((htmlData) => {
      $ = cheerio.load(htmlData);

      const resourcesInfo = $('img, script, link')
        .map((_, el) => {
          const attr = getAttrByTagname(el.name);
          const currentResourcePath = $(el).attr(attr);

          if (!isLocalLink(currentResourcePath, pageUrl)) {
            return;
          }

          const { href } = new URL(currentResourcePath, origin);
          const filename = createResourceFilename(currentResourcePath, hostname);
          const newResourcePath = join(assetsFoldername, filename);

          return { $node: $(el), resourcePath: href, filename, newResourcePath };
        })
        .toArray();

      return resourcesInfo;
    })
    .then((resourceInfo) => {
      const promises = resourceInfo.map(({ filename, resourcePath, $node, newResourcePath }) => {
        const pathToWrite = join(assetsPath, filename);
        return loadResource(resourcePath, pathToWrite).then(() => ({ $node, newResourcePath }));
      });

      return Promise.allSettled(promises);
    })
    .then((promises) => {
      promises.forEach((promise) => {
        if (promise.status === 'fulfilled') {
          const { $node, newResourcePath } = promise.value;
          const attr = getAttrByTagname($node.prop('tagName').toLowerCase());
          $node.attr(attr, newResourcePath);
        } else {
          console.log(promise.reason);
        }
      });
    })
    .then(() => {
      const newHtml = $.html();
      return writeFile(pathToHtml, newHtml);
    });
};
