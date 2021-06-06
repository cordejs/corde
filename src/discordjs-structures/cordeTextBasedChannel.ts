/**
 * All references and documentation is from Discord.js
 * and Discord API documentations.
 *
 * @see https://discord.js.org/#/docs/main/stable/general/welcome
 * @see https://discord.com/developers/docs/intro
 */

import { DMChannel, Message, NewsChannel, TextChannel } from "discord.js";
import { mapper } from "../mapper/messageMapper";
import { IMessageEmbed } from "../types";
import { isPrimitiveValue } from "../utils";
import { CordeChannel } from "./cordeChannel";
import { CordeMessage } from "./cordeMessage";

/**
 * Partial Encapsulation of [Discord.js TextChannel](https://discord.js.org/#/docs/main/master/class/TextChannel).
 */
export class CordeTextBasedChannel<
  T extends TextChannel | DMChannel | NewsChannel,
> extends CordeChannel<T> {
  constructor(channel: T) {
    super(channel);
  }

  /**
   * The date when the last pinned message was pinned, if there was one.
   */
  get lastPinAt() {
    return this._channel.lastPinAt;
  }

  /**
   * Whether or not the typing indicator is being shown in the channel.
   */
  get isTyping() {
    return this._channel.typing;
  }

  /**
   * Number of times `startTyping` has been called
   */
  get typingCount() {
    return this._channel.typingCount;
  }

  /**
   * The Message object of the last message in the channel, if one was sent.
   */
  get lastMessage() {
    if (this._channel.lastMessage) {
      return new CordeMessage(this._channel.lastMessage);
    }
    return null;
  }

  /**
   * The ID of the last message sent in this channel, if one was sent.
   */
  get lastMessageId() {
    return this._channel.lastMessage?.id;
  }

  /**
   * Starts a typing indicator in the channel.
   *
   * @param count The number of times startTyping should be considered to have been called.
   *
   * @example
   *
   * // Start typing in a channel, or increase the typing count by one
   * channel.startTyping();
   *
   * // Start typing in a channel with a typing count of five, or set it to five
   * channel.startTyping(5);
   *
   * @returns This. Resolves once the bot stops typing gracefully, or rejects when an error occurs.
   */
  async startTyping(): Promise<this>;
  async startTyping(count: number): Promise<this>;
  async startTyping(count?: number): Promise<this> {
    await this._channel.startTyping(count);
    return this;
  }

  /**
   * Stops the typing indicator in the channel. The indicator will only stop if this is called as many times as `startTyping()`.
   *
   * *It can take a few seconds for the client user to stop typing.*
   *
   * @param force Whether or not to reset the call count and force the indicator to stop.
   *
   * @example
   *
   * // Reduce the typing count by one and stop typing if it reached 0
   * channel.stopTyping();
   *
   * // Force typing to fully stop regardless of typing count
   * channel.stopTyping(true);
   *
   * @returns This.
   */
  stopTyping(): this;
  stopTyping(force: boolean): this;
  stopTyping(force?: boolean): this {
    this._channel.stopTyping(force);
    return this;
  }

  /**
   * Sends a message to this channel.
   *
   * @param message The content to send.
   *
   * @example
   *
   * // Send a basic message
   * channel.send('hello!')
   * .then(message => console.log(`Sent message: ${message.content}`))
   * .catch(console.error);
   *
   * // Send an embed with a local image inside
   * channel.send('This is an embed', {
   * embed: {
   * thumbnail: {
   *      url: 'attachment://file.jpg'
   *   }
   * },
   * files: [{
   *   attachment: 'entire/path/to/file.jpg',
   *   name: 'file.jpg'
   *   }]
   * })
   *
   *   // Send a local file
   * channel.send({
   *   files: [{
   *     attachment: 'entire/path/to/file.jpg',
   *     name: 'file.jpg'
   *   }]
   * })
   *
   */
  async send(message: string | number | bigint | boolean | IMessageEmbed) {
    let _message!: Message;
    if (isPrimitiveValue(message)) {
      _message = await this._channel.send(message);
    } else {
      const embed = mapper.embedInterfaceToMessageEmbed(message);
      _message = await this._channel.send(embed);
    }
    return new CordeMessage(_message);
  }
}
