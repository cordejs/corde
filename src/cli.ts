import { Command } from "commander";
import * as pack from "../package.json";
import { go } from "./cli-commands/go";
import init from "./cli-commands/init";
import { validate } from "./cli-commands/validate";
import { runtime } from "./common";
import reader from "./core/reader";
import { configFileType } from "./models";
import { initProcessEventsHandlers } from "./processEvents";

initProcessEventsHandlers();

const program = new Command();

// Add basic information with default run all command
program
  .name("Corde")
  .usage("to start testings o corde [option] to use a specific command.")
  .description(pack.description)
  .version(`v${pack.version}`, "-v, --version")
  .option("-c --config <type>", "Set config file path")
  .action(async () => {
    if (program.config) {
      runtime.configFilePath = program.config;
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
    process.exit(0);
  });

program
  .command("validate")
  .alias("v")
  .description("Search for corde configs and check if all data are valid")
  .action(() => {
    const configs = reader.loadConfig();
    try {
      validate(configs);
      console.log("All configs are ok!");
    } catch (error) {
      process.exit(1);
    }
  });

program.parse(process.argv);
