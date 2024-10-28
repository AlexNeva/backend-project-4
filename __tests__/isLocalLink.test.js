import { isLocalLink } from '../src/utils/isLocalLink.js';

const resources = [
  { link: '/assets/application.css', baseUrl: 'https://example.com', expected: true },
  { link: 'https://ru.example.com', baseUrl: 'https://example.com', expected: false },
  {
    link: 'https://ru.hexlet.io/packs/js/runtime.js',
    baseUrl: 'https://ru.hexlet.io',
    expected: true,
  },
];

test.each(resources)('isLocalLink($link, $baseUrl)', ({ link, baseUrl, expected }) => {
  expect(isLocalLink(link, baseUrl)).toBe(expected);
});
