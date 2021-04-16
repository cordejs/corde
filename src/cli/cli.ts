import { Command } from "commander";
import { exec } from "./exec";
import { init } from "./init";
import { validate } from "./validate";
import { CliConfigOptions, ConfigFileType } from "../types";
import pack from "../package";
import { runtime } from "../common/runtime";
import { reader } from "../core/reader";
import { initEnvVariables } from "../envVariables";
import { logger } from "../logger";

initEnvVariables();
logger.mock();

export const program = new Command();

// Add basic information with default run all command
program
  .name("Corde")
  .usage("to start testings o corde [option] to use a specific command.")
  .description(pack.description)
  .version(`v${pack.version}`, "-v, --version");

program
  .option("-c, --config <type>", "Set config file path")
  .option("--silent", "Disable all logs from external applications")
  .option("--botPrefix <type>", "Set the prefix of all commands")
  .option("--timeout <type>", "Set the timeout of tests")
  .option("--guildId <type>", "Set the id of the guild where tests iterations will be done")
  .option("--channelId <type>", "Set the id of the channel where tests iterations will be done")
  .option("--botTestToken <type>", "Set the token of the testing bot")
  .option("--botTestId <type>", "Set the id of the testing bot")
  .option("--cordeTestToken <type>", "Set the id of bot used by corde")
  .option(
    "-f, --files <path>",
    "Set the path for all tests. Use this if you wan to specify a single path." +
      " for Array, use only 'corde <path1> <path2>'",
  )
  .action(async (args: any) => {
    const options = program.opts() as CliConfigOptions;
    if (options.config) {
      runtime.configFilePath = options.config;
    }

    if (args) {
      runtime.setConfigs({ testFiles: program.args }, true);
    }

    if (options.files) {
      runtime.setConfigs({ testFiles: options.files.split(" ") }, true);
    }

    runtime.setConfigs(
      {
        silent: options.silent,
        botPrefix: options.botPrefix,
        botTestId: options.botTestId,
        botTestToken: options.botTestToken,
        channelId: options.channelId,
        cordeTestToken: options.cordeTestToken,
        guildId: options.guildId,
        timeOut: options.timeOut,
      },
      true,
    );

    await exec();
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
  .action(() => {
    const configs = reader.loadConfig();
    validate(configs);
    logger.log("All configs are ok!");
  });

if (process.env.ENV !== "UNITY_TEST" && process.env.ENV !== "E2E_TEST") {
  _main();
}

export async function _main(args?: string[]) {
  await program.parseAsync(args ?? process.argv);
}
