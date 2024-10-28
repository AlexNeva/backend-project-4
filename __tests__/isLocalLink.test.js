import { isLocalLink } from '../src/utils/isLocalLink.js';

const resources = [
  { link: '/assets/application.css', baseUrl: 'https://example.com', expected: true },
  { link: 'https://ru.example.com', baseUrl: 'https://example.com', expected: false },
];

test.each(resources)('isLocalLink($link, $baseUrl)', ({ link, baseUrl, expected }) => {
  expect(isLocalLink(link, baseUrl)).toBe(expected);
});
