import chalk from 'chalk';

export function initProcessEventsHandlers() {
  process.on('uncaughtException', (err) => {
    printErrorAndExit(err.message);
  });

  process.on('unhandledRejection', (err: Error) => {
    printErrorAndExit(err.message);
  });

  process.on('uncaughtExceptionMonitor', (err) => {
    printErrorAndExit(err.message);
  });
}

function printErrorAndExit(erroMessage: string) {
  console.error(`- ${erroMessage}`);
  console.error(`${chalk.red('error')} Command failed with exit code 1`);
  process.exit(1);
}
