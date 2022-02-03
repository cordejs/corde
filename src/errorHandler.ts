/* eslint-disable no-console */
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
    console.error(error.message);
  } else {
    console.error(error);
  }

  if (runtime.isBotLoggedIn()) {
    runtime.logoffBot();
  }

  if (process.env.ENV !== "TEST") {
    exit(1);
  }
}
