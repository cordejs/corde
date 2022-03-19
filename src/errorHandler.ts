/* eslint-disable no-console */
import { logger } from "./core/Logger";
import runtime from "./core/runtime";
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

async function printErrorAndExit(error: unknown) {
  if (error instanceof Error) {
    logger.log("\n");
    logger.error(error.message);
    logger.log("\n");
  } else {
    console.log("\n");
    console.error(error);
    console.log("\n");
  }

  logger.printStacks();

  if (runtime.isBotLoggedIn()) {
    runtime.logoffBot();
  }

  if (process.env.ENV !== "TEST") {
    exit(1);
  }
}
