import chalk from "chalk";
import { runtime, testCollector } from "./common";

export function initErrorHandlers() {
  process.on("uncaughtException", (err: Error) => {
    printErrorAndExit(err);
  });

  process.on("unhandledRejection", (err: Error) => {
    printErrorAndExit(err);
  });

  process.on("uncaughtExceptionMonitor", (err) => {
    printErrorAndExit(err);
  });
}

function printErrorAndExit(error: Error) {
  console.error(`- ${error.name}: ${error.message}`);
  console.error(`${chalk.red("error")} Command failed with exit code 1`);
  console.error(error.stack);

  if (runtime.bot && runtime.bot.isLoggedIn()) {
    runtime.bot.logout();
  }
  if (testCollector.afterAllFunctions) {
    testCollector.afterAllFunctions.forEach((fn) => fn());
  }

  if (process.env.ENV !== "TEST") {
    process.exit(1);
  }
}
