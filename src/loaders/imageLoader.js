import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, parse, resolve } from 'node:path';
import * as cheerio from 'cheerio';
import axios from 'axios';
import generateSlug from '../utils/generateSlug.js';
import { isLocalLink } from '../utils/isLocalLink.js';

const createImgFilename = (path, hostname) => {
  const { dir, ext, name } = parse(path);
  const imgFilename = `${generateSlug(join(hostname, dir, name))}${ext}`;

  return imgFilename;
};

const loadImage = (pathToLoad, pathToWrite) =>
  axios
    .get(pathToLoad, { responseType: 'arraybuffer' })
    .then((response) => writeFile(pathToWrite, response.data))
    .catch(() => {
      throw `Image loading by "${pathToLoad}" is failed`;
    });

export const downloadImages = (pathToHtml, pageUrl) => {
  const { dir, name } = parse(pathToHtml);
  const assetsFoldername = `${name}_files`;
  const assetsPath = resolve(dir, assetsFoldername);
  const { origin, hostname } = new URL(pageUrl);

  let $;

  return mkdir(assetsPath, { recursive: true })
    .then(() => readFile(pathToHtml, 'utf-8'))
    .then((htmlData) => {
      $ = cheerio.load(htmlData);

      const imagesInfo = $('img')
        .map((_, img) => {
          const currentSrc = $(img).attr('src');

          // if (!isLocalLink(currentSrc, pageUrl)) {
          //   return;
          // }

          const { href } = new URL(currentSrc, origin);
          const imgFilename = createImgFilename(currentSrc, hostname);
          const newSrc = join(assetsFoldername, imgFilename);

          return { $img: $(img), imagePath: href, filename: imgFilename, newSrc };
        })
        .toArray();

      console.log(imagesInfo);

      return imagesInfo;
    })
    .then((imagesInfo) => {
      const promises = imagesInfo.map(({ filename, imagePath, $img, newSrc }) => {
        const pathToWrite = join(assetsPath, filename);
        return loadImage(imagePath, pathToWrite).then(() => ({ $img, newSrc }));
      });

      return Promise.allSettled(promises);
    })
    .then((promises) => {
      promises.forEach((promise) => {
        if (promise.status === 'fulfilled') {
          const { $img, newSrc } = promise.value;

          $img.attr('src', newSrc);
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
