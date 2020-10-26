import chalk from "chalk";
import { runtime, testCollector } from "./common";

export function initErrorHandlers() {
  process.on("uncaughtException", async (err: Error) => {
    await printErrorAndExit(err);
  });

  process.on("unhandledRejection", async (err: Error) => {
    await printErrorAndExit(err);
  });

  process.on("uncaughtExceptionMonitor", async (err) => {
    await printErrorAndExit(err);
  });
}

async function printErrorAndExit(error: Error) {
  console.log(error.stack);
  console.log(`${chalk.red("error")} Command failed with exit code 1`);

  if (runtime.isBotLoggedIn()) {
    runtime.logoffBot();
  }
  if (testCollector.afterAllFunctions) {
    await testCollector.afterAllFunctions.executeAsync();
  }

  if (process.env.ENV !== "TEST") {
    process.exit(1);
  }
}
