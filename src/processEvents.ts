import chalk from 'chalk';

export function initProcessEventsHandlers() {
  process.on('uncaughtException', (err: Error) => {
    printErrorAndExit(err);
  });

  process.on('unhandledRejection', (err: Error) => {
    printErrorAndExit(err);
  });

  process.on('uncaughtExceptionMonitor', (err) => {
    printErrorAndExit(err);
  });
}

function printErrorAndExit(error: Error) {
  console.error(`- ${error.name}: ${error.message}`);
  console.error(`${chalk.red('error')} Command failed with exit code 1`);
  process.exit(1);
}
