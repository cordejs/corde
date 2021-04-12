import { runtime } from "./common/runtime";
import { testCollector } from "./common/testCollector";
import { exit } from "./exit";
import { logger } from "./logger";

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
  logger.error(error);

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
