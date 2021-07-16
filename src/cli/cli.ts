import { Command } from "commander";
import { exec } from "./exec";
import { init } from "./init";
import { validate } from "./validate";
import { ConfigFileType } from "../types";
import pack from "../package";
import { Config } from "../types";
import { reader } from "../core/reader";
import { initEnvVariables } from "../envVariables";
import { initErrorHandlers } from "../errorHandler";

initErrorHandlers();
initEnvVariables();

export const program = new Command();

// Add basic information with default run all command
program
  .name("Corde")
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
  .action(async (args: any) => {
    const options = program.opts() as Config.ICLIOptions;
    await exec(options, args);
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
    const configs = await reader.loadConfig();
    await validate(configs);
    console.log("All configs are ok!");
  });

if (process.env.ENV !== "UNITY_TEST" && process.env.ENV !== "E2E_TEST") {
  _main();
}

export async function _main(args?: string[]) {
  await program.parseAsync(args ?? process.argv);
}
