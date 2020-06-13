import { runTestsFromConfigs } from './process/engine';
import fs from 'fs';
import path from 'path';
import { ConfigFileNotFoundError } from './errors';
import { Command } from 'commander';
import * as pack from '../package.json';

export function main(args: string[]) {
  const program = new Command();
  program.version(pack.version, '-v').parse(args);

  if (program.args.length === 0) {
    runTestsFromConfigs();
  }
}
