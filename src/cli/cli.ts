/* eslint-disable no-console */

import { Command } from "commander";
import { exec } from "./exec";
import { init } from "./init";
import { validate } from "./validate";
import { ConfigFileType } from "../types";
import { pack } from "../package";
import { initEnvVariables } from "../envVariables";
import { initErrorHandlers } from "../errorHandler";
import runtime from "../core/runtime";
import { injectGlobals } from "../core/injectGlobals";
import { reader } from "../core/Reader";
import { logger } from "../core/Logger";
import { showConfigs } from "./showConfigs";
import { exit } from "process";

initErrorHandlers();
initEnvVariables();

// global variables can not be injected when running unity tests
// to not conflict with jest

if (!runtime.isUnityTest) {
  logger.mock();
  injectGlobals().catch((e) => logger.error("could not load corde's globals: ", e));
}

export const program = new Command();

// Add basic information with default run all command
program
  .name("corde")
  .usage("to start testings o corde [option] to use a specific command.")
  .description(pack.description)
  .version(`v${pack.version}`, "-v, --version");

program
  .option("-c, --config <type>", "Set config file path")
  .option("-p, --project <type>", "Set tsconfig path")
  .option(
    "-f, --files <path>",
    "Set the path for all tests. Use this if you wan to specify a single path." +
      " for Array, use only 'corde <path1> <path2>'",
  )
  .action(async () => {
    const options = program.opts() as corde.Config.ICLIOptions;
    await exec(options);
  });

program
  .command("init [type]")
  .alias("i")
  .description("Initialize a config file with all possible options")
  .usage("[js ts json] or empty for default type (json)")
  .action((type: ConfigFileType) => {
    init(type);
  });

program
  .command("validate")
  .alias("v")
  .description("Search for corde configs and check if all data are valid")
  .action(async () => {
    const configs = reader.loadConfig();
    await validate(configs);
    logger.log("All configs are ok!");
  });

program
  .command("showConfigs")
  .alias("show")
  .description("Loads configs and display them")
  .option("-c, --config <type>", "Set config file path")
  .option("-p, --project <type>", "Set tsconfig path")
  .action(() => {
    const options = program.opts() as corde.Config.ICLIOptions;
    showConfigs(options);
    // Force to exit
    exit(0);
  });

if (process.env.ENV !== "UNITY_TEST" && process.env.ENV !== "E2E_TEST") {
  _main();
}

export async function _main(args?: string[]) {
  await program.parseAsync(args ?? process.argv);
}
