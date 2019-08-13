#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import program from 'commander';
import { loadData } from './init';

clear();

console.log(
  chalk.red(
    figlet.textSync('Concord', { horizontalLayout: 'full' })
  )
);

program
	.version('0.0.1')
  .description("Discord bot testing framework")
  .option('-r, --run', 'run tests')
	.parse(process.argv);
	
if (program.run) {
  loadData();
}

if (!process.argv.slice(2).length) {
	program.outputHelp();
}