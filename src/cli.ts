import { Command } from 'commander';
import * as pack from '../package.json';
import init from './commands/init';
import { configFileType } from './models';
import { runTestsFromConfigs } from './process/engine';

export function main(args: string[]) {
  const program = new Command();

  // Add basic information with default run all command
  program
    .name('Corde')
    .usage('to start testings o corde [option] to use a specific command.')
    .description(pack.description)
    .version(pack.version, '-v')
    .action(() => {
      runTestsFromConfigs();
    });

  // Add init command
  program
    .command('init [type]')
    .alias('i')
    .description('Initialize a config file with all possible options')
    .usage('[js ts json] or empty for default type (json)')
    .action((type: configFileType) => {
      init(type);
    });

  program.parse(args);
}
