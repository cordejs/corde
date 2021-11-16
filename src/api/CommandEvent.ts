import {
  // Channel,
  // Collection,
  // Guild,
  // GuildEmoji,
  // GuildMember,
  Message,
  // MessageReaction,
  // PartialGuildMember,
  // PartialMessage,
  // PartialUser,
  // Presence,
  // Role,
  // User,
  // VoiceState,
} from "discord.js";
import { runtime } from "../core";

export class CommandEvent {
  private _message!: Message;
  private readonly _messagePromise: Promise<Message>;

  constructor(messagePromise: Promise<Message>) {
    this._messagePromise = messagePromise;
    this._messagePromise.then((m) => (this._message = m));
  }

  waitMessage() {
    if (this._message) {
      return Promise.resolve(this._message);
    }
    return this._messagePromise;
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
