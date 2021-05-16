import { testCollector } from "./common/testCollector";
import { logger, runtime } from "./environment";

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
  logger.log(error);

  if (runtime.isBotLoggedIn()) {
    runtime.logoffBot();
  }

  if (testCollector.afterAllFunctions) {
    await testCollector.afterAllFunctions.executeAsync();
  }

  // if (process.env.ENV !== "TEST") {
  //   exit(1);
  // }
}
