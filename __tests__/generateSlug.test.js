import generateSlug from '../src/utils/generateSlug.js';

test('generateSlug', () => {
  const url1 = 'ru.hexlet.io/courses';
  const expectedFilename1 = 'ru-hexlet-io-courses';
  const url2 = 'chatgpt.com/c/671a75be-4474-8006-a54e-e0230bd21a56';
  const expectedFilename2 = 'chatgpt-com-c-671a75be-4474-8006-a54e-e0230bd21a56';
  expect(generateSlug(url1)).toEqual(expectedFilename1);
  expect(generateSlug(url2)).toEqual(expectedFilename2);
});
