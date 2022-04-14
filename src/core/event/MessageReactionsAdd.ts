import { Client } from "discord.js";
import { MessageReaction } from "./common/MessageReaction";

export class MessageReactionsAdd extends MessageReaction {
  constructor(client: Client) {
    super(client, "messageReactionAdd");
  }

  once(options?: corde.ISearchMessageReactionsFilter) {
    return super.once(options);
  }
}
