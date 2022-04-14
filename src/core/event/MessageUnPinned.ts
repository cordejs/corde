import { Client } from "discord.js";
import { MessageUpdate } from "./MessageUpdate";

export class MessageUnPinned extends MessageUpdate {
  constructor(client: Client) {
    super(client);
    this.validator.add(
      (oldMessage, newMessage) => (oldMessage.pinned as boolean) && !(newMessage.pinned as boolean),
    );
  }
}
