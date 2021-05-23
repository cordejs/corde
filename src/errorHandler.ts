import { spinner } from "./cli/exec";
import { testCollector } from "./common/testCollector";
import { DOT } from "./consts";
import { logger, runtime } from "./environment";
import { exit } from "./exit";

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
  spinner?.stop();
  logger.error(`${DOT} ${error.stack}`);

  if (runtime.isBotLoggedIn()) {
    runtime.logoffBot();
  }

  if (testCollector.afterAllFunctions) {
    await testCollector.afterAllFunctions.executeAsync();
  }

  if (process.env.ENV !== "TEST") {
    exit(1);
  }
}
