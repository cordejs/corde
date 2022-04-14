import { Client, Message } from "discord.js";
import { executePromiseWithTimeout } from "../../utils/executePromiseWithTimeout";
import { Validator } from "../../utils/validator";
import { EventNames } from "../intentHelper";
import { DiscordEvent } from "./common/DiscordEvent";

export class MessageCreate extends DiscordEvent<Message<boolean>, corde.IMessageContentEvent> {
  constructor(client: Client, event: EventNames = "messageCreate") {
    super(client, event);
  }

  once(options?: corde.IMessageContentEvent): Promise<Message<boolean>> {
    const validator = new Validator<[Message]>();

    if (options?.author) {
      validator.add(
        (mgs) =>
          mgs.author.username === options?.author?.username ||
          mgs.author.id === options?.author?.id ||
          mgs.author.bot === options.author?.isBot,
      );
    }

    if (options?.message) {
      validator.add((msg) => this.getMessageIdentifierValidation(msg, options.message));
    }

    if (options?.channel) {
      validator.add((mgs) => this.getChannelIdentifierValidation(mgs.channel, options.channel));
    }

    return executePromiseWithTimeout<Message>((resolve) => {
      this.on((message) => {
        if (validator.isValid(message)) {
          resolve(message);
        }
      });
    }, options?.timeout);
  }
}
