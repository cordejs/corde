import { Client } from "discord.js";
import { MessageReaction } from "./common/MessageReaction";

export class MessageReactionRemoveEmoji extends MessageReaction {
  constructor(client: Client) {
    super(client, "messageReactionRemoveEmoji");
  }

  once(options?: corde.ISearchMessageReactionsFilter) {
    return super.once(options);
  }
}
