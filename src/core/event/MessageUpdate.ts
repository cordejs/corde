import { Client, Message, PartialMessage } from "discord.js";
import { deepEqual } from "../../utils/deepEqual";
import { executePromiseWithTimeout } from "../../utils/executePromiseWithTimeout";
import { Validator } from "../../utils/validator";
import { DiscordEvent } from "./common/DiscordEvent";

export class MessageUpdate extends DiscordEvent<"messageUpdate", corde.IMessageEventFilter> {
  protected readonly validator: Validator<[Message | PartialMessage, Message | PartialMessage]>;

  constructor(client: Client) {
    super(client, "messageUpdate");
    this.validator = new Validator<[Message | PartialMessage, Message | PartialMessage]>();
  }

  once(options?: corde.IMessageEventFilter) {
    this.validator.add(
      (oldMessage, newMessage) =>
        oldMessage.content != newMessage.content ||
        this.messagesHasDifferentEmbeds(oldMessage, newMessage),
    );

    if (options?.message) {
      this.validator.add((oldMessage) =>
        this.getMessageIdentifierValidation(oldMessage, options?.message),
      );
    }

    if (options?.channel) {
      this.validator.add((message) =>
        this.getChannelIdentifierValidation(message.channel, options?.channel),
      );
    }

    return executePromiseWithTimeout<Message>((resolve) => {
      this.on(async (oldMessage, newMessage) => {
        if (this.validator.isValid(oldMessage, newMessage)) {
          const fullMessage = newMessage.partial ? await newMessage.fetch() : newMessage;
          resolve(fullMessage);
        }
      });
    }, options?.timeout);
  }

  private messagesHasDifferentEmbeds(
    oldMessage: Message | PartialMessage,
    newMessage: Message | PartialMessage,
  ) {
    return !deepEqual(oldMessage.embeds, newMessage.embeds);
  }
}
