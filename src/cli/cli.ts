import { Command } from "commander";
import { go } from "./go";
import { init } from "./init";
import { validate } from "./validate";
import { configFileType } from "../types/types";
import { initErrorHandlers } from "../errorHandler";
import pack from "../package";
import { runtime } from "../common";
import { reader } from "../core";

initErrorHandlers();

export const program = new Command();

// Add basic information with default run all command
program
  .name("Corde")
  .usage("to start testings o corde [option] to use a specific command.")
  .description(pack.description)
  .version(`v${pack.version}`, "-v, --version");

program
  .option("-c, --config <type>", "Set config file path")
  .option(
    "-f, --files <path>",
    "Set the path for all tests. Use this if you wan to specify a single path." +
      " for Array, use only 'corde <path1> <path2>'",
  )
  .action(async (args) => {
    const options = program.opts();
    if (options.config) {
      runtime.configFilePath = options.config;
    }
    if (args) {
      runtime.testFiles = program.args;
    }
    if (options.files) {
      runtime.testFiles = options.files.split(" ");
    }
    await go();
  });

program
  .command("init [type]")
  .alias("i")
  .description("Initialize a config file with all possible options")
  .usage("[js ts json] or empty for default type (json)")
  .action((type: configFileType) => {
    init(type);
  });

program
  .command("validate")
  .alias("v")
  .description("Search for corde configs and check if all data are valid")
  .action(() => {
    const configs = reader.loadConfig();
    validate(configs);
    console.log("All configs are ok!");
  });

// tslint:disable-next-line: deprecation
if (process.env.ENV !== "TEST") {
  program.parse(process.argv);
} else {
  program.exitOverride();
}
