import chalk from "chalk";
import { Command } from "commander";
import { logger } from "../../core/Logger";
import runtime from "../../core/runtime";
import { pick } from "../../utils/pick";
import { commandFactory } from "../common";
import { CliCommand } from "../common/CliCommand";
import { Exec } from "./Exec";

type WatchOptions = Pick<corde.Config.ICLIOptions, "config">;

export class Watch extends CliCommand {
  constructor(program: Command) {
    super({
      program,
      name: "watch",
      paramsFrom: "both",
    });

    this.setOptions({
      flags: "-c, --config <type>",
      description: "Set config file path",
    });

    this.setArg("<event>");
  }

  async handler(options: WatchOptions, event?: "messages-sent") {
    if (!event || event !== "messages-sent") {
      logger.log(`Invalid argument: ${chalk.red(event)}`);
      return;
    }

    const exec = commandFactory.getCommand(Exec);
    await exec?.loadConfigsAndValidate({
      config: options.config,
    });
    await exec?.loginBot();

    logger.log(chalk.cyan(`Watching for ${chalk.yellow(event)} be emitted:`));

    runtime.bot.events.onMessageCreate((message) => {
      const m = pick(message, "id", "content", "channelId", "guildId", "createdAt", "pinned");
      logger.log(m);
    });
  }
}
