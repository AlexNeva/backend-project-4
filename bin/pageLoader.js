#!/usr/bin/env node

import { program } from 'commander';

program
  .name('page-loader')
  .description('Page loader utility')
  .version('1.0.0')
  .option('-o, --output [dir]', 'output directory', '/home/user/current-dir')
  .arguments('<url>')
  .action((url, option) => {
    console.log('up');
  });

program.parse();
