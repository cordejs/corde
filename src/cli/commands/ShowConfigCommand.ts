import { Command } from "commander";
import { exit } from "process";
import { logger } from "../../core/Logger";
import runtime from "../../core/runtime";
import { IDisposable } from "../../types";
import { CliCommand } from "../common/CliCommand";
import { loadConfigs } from "../common";

export class ShowConfigCommand extends CliCommand implements IDisposable {
  constructor(program: Command) {
    super({
      program,
      name: "showConfigs",
      paramsFrom: "options",
    });

    this.alias("show");
    this.description("Loads configs and display them");
  }

  dispose() {
    exit(0);
  }

  handler(options: corde.Config.ICLIOptions): void | Promise<void> {
    loadConfigs(options);
    logger.log(runtime.configs.getProps());
  }
}
