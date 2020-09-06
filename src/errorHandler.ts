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
  if (error.name) {
    console.log(`- ${error.name}: ${error.message}`);
    console.log(`${chalk.red("error")} Command failed with exit code 1`);
    console.log(error.stack);
  } else {
    console.log("Unkown error");
  }

  if (runtime.isBotLoggedIn()) {
    runtime.logoffBot();
  }
  if (testCollector.afterAllFunctions) {
    testCollector.afterAllFunctions.forEach((fn) => fn());
  }

  if (process.env.ENV !== "TEST") {
    process.exit(1);
  }
}
