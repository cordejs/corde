#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import program from 'commander';
import figlet from 'figlet';
import pack from '../package.json';
import { execTestFiles } from './init';

clear();

console.log(chalk.red(figlet.textSync('corde', { horizontalLayout: 'full' })));

program
  .version(pack.version)
  .description('Discord bot testing framework')
  .option('-r, --run [file]', 'run tests')
  .parse(process.argv);

if (program.run) execTestFiles(program.run);
if (!process.argv.slice(2).length) program.outputHelp();
