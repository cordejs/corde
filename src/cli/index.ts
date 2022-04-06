/* eslint-disable no-console */

import { Command } from "commander";
import { pack } from "../package";
import { initEnvVariables } from "../envVariables";
import { initErrorHandlers } from "../errorHandler";
import runtime from "../core/runtime";
import { injectGlobals } from "../core/injectGlobals";
import { logger } from "../core/Logger";
import { commandFactory } from "./common";

initErrorHandlers();
initEnvVariables();

// global variables can not be injected when running unity tests
// to not conflict with jest

if (!runtime.isUnityTest) {
  //logger.mock();
  injectGlobals().catch((e) => logger.error("could not load corde's globals: ", e));
}

export const program = new Command();

try {
  // Add basic information with default run all command
  program
    .name("corde")
    .usage("to start testings o corde [option] to use a specific command.")
    .description(pack.description)
    .version(`v${pack.version}`, "-v, --version");

  commandFactory.loadCommands(program);
} catch (error) {
  console.log(error);
}

if (process.env.ENV !== "UNITY_TEST" && process.env.ENV !== "E2E_TEST") {
  _main();
}

export async function _main(args?: string[]) {
  await program.parseAsync(args ?? process.argv);
  logger.printStacks();
}
