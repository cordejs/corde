import { Client, MessageReaction } from "discord.js";

export class Events {
  protected readonly _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  /**
   * Emitted when the client becomes ready to start working.
   * @param fn Operation to be executed after client becomes ready.
   */
  public onReady(fn: () => void) {
    this._client.on("ready", fn);
  }

  /**
   * Emitted when a **bot** removes a emoji from a message;
   */
  public onMessageReactionRemoveEmoji(fn: (reaction: MessageReaction) => void) {
    this._client.on("messageReactionRemoveEmoji", fn);
  }
}
