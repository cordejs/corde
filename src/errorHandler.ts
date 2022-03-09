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
  logger.log("\n");
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    logger.error(error);
  }

  if (runtime.isBotLoggedIn()) {
    runtime.logoffBot();
  }

  logger.log("\n");

  if (process.env.ENV !== "TEST") {
    exit(1);
  }
}
