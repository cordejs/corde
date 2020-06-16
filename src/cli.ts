import { Command } from 'commander';
import * as pack from '../package.json';
import { runTestsFromConfigs } from './commands/go';
import init from './commands/init';
import validate from './commands/validate';
import reader from './core/reader';
import { configFileType } from './models';
import { exitProcessWithError } from './utils/utils';

const program = new Command();

// Add basic information with default run all command
program
  .name('Corde')
  .usage('to start testings o corde [option] to use a specific command.')
  .description(pack.description)
  .version(pack.version, '-v')
  .action(async () => {
    await runTestsFromConfigs();
  });

// Add init command
program
  .command('init [type]')
  .alias('i')
  .description('Initialize a config file with all possible options')
  .usage('[js ts json] or empty for default type (json)')
  .action((type: configFileType) => {
    init(type);
    process.exit(0);
  });

program
  .command('validate')
  .alias('v')
  .alias('val')
  .alias('vali')
  .description('Search for corde configs and check if all data are valid')
  .action(() => {
    const configs = reader.loadConfig();
    if (validate(configs)) {
      process.exit(0);
    } else {
      exitProcessWithError();
    }
  });
program.parse(process.argv);
