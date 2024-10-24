#!/usr/bin/env node

import { program } from 'commander';
import pageLoader from '../src/index.js';

program
  .name('page-loader')
  .description('Page loader utility')
  .version('1.0.0')
  .option('-o, --output [dir]', 'output directory', process.cwd())
  .arguments('<url>')
  .action((url, option) => {
    pageLoader(url, option.output);
  });

program.parse();
