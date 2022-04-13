/* eslint-disable no-console */
import { logger } from "./core/Logger";
import runtime from "./core/runtime";
import { exit } from "./exit";

export function initEventHandlers() {
  process.on("uncaughtException", async (err: Error) => {
    await printErrorAndExit(err);
  });

  process.on("unhandledRejection", async (err: Error) => {
    await printErrorAndExit(err);
  });

  process.on("uncaughtExceptionMonitor", async (err) => {
    await printErrorAndExit(err);
  });

  process.on("exit", () => {
    exitHandle();
  });

  process.on("beforeExit", () => {
    exitHandle();
  });

  process.on("disconnect", () => {
    exitHandle();
  });

  // CTRL+C
  process.on("SIGINT", () => {
    exitHandle();
  });

  // Keyboard quit
  process.on("SIGQUIT", () => {
    exitHandle();
  });

  // `kill` command
  process.on("SIGTERM", () => {
    exitHandle();
  });

  process.on("SIGHUP", () => {
    exitHandle();
  });
}

function exitHandle() {
  runtime.bot?.logout();
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
    exitHandle();
  }

  if (process.env.ENV !== "TEST") {
    exit(1);
  }
}
