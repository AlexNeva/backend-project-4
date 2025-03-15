import { createRequire } from 'module';

const require = createRequire(import.meta.url);
require('axios-debug-log');
const axios = require('axios');

const api = axios.create({ baseURL: '/' });

export default api;
