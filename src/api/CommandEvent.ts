import { Message } from "discord.js";
import { runtime } from "../core";

export class CommandEvent implements corde.ICommandEvent {
  constructor(private messagePromise: Promise<Message>) {}

  waitMessage() {
    return this.messagePromise;
  }

  onceMessage(options?: corde.IMessageEventOptions) {
    options = options ?? {};
    return runtime.events.onceMessage({
      authorId: options.authorId ?? runtime.botTestId,
      channelId: options.channelId ?? runtime.channelId,
    });
  }

  onceMessageReactionsAdd(options?: corde.ISearchMessageReactionsOptions) {
    options = options ?? {};
    return runtime.events.onceMessageReactionsAdd({
      authorId: options.authorId ?? runtime.botTestId,
      channelId: options.channelId ?? runtime.channelId,
      ...options,
    });
  }

  onceChannelCreate() {
    return runtime.events.onceChannelCreate();
  }
}
