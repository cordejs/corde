import { Command } from "commander";
import { exit } from "process";
import { logger } from "../../core/Logger";
import runtime from "../../core/runtime";
import { IDisposable } from "../../types";
import { commandFactory } from "../common";
import { CliCommand } from "../common/CliCommand";
import { Exec } from "./Exec";
import { pick } from "../../utils/pick";

interface ISendCliOptions extends Pick<corde.Config.ICLIOptions, "files" | "config"> {
  message: string;
}

export class SendMessage extends CliCommand implements IDisposable {
  constructor(program: Command) {
    super({
      program,
      name: "send-message",
      paramsFrom: "both",
    });

    this.setArg("<content>", "Define the content of what should be sent");

    this.options(
      {
        flags: "-c, --config <type>",
        description: "Set config file path",
      },
      {
        flags: "-p, --project <type>",
        description: "Set tsconfig path",
      },
    );
  }

  dispose(): void | Promise<void> {
    runtime.bot.logout();
    exit(0);
  }

  async handler(options: ISendCliOptions, message: string) {
    if (!message) {
      return;
    }

    const exec = commandFactory.getCommand(Exec);
    await exec?.loadConfigsAndValidate({
      config: options.config,
      files: options.files,
    });
    await exec?.loginBot();
    const { bot } = runtime;
    const messageSent = await bot.sendMessage(message);
    const minimalMessage = pick(messageSent, "id", "content", "channelId", "guildId");
    logger.log(`Sent message: `);
    logger.log(minimalMessage);
  }
}
