/**
 * All references and documentation is from Discord.js
 * and Discord API documentations.
 *
 * @see https://discord.js.org/#/docs/main/stable/general/welcome
 * @see https://discord.com/developers/docs/intro
 */

import { GuildEmoji, Message, ReactionEmoji } from "discord.js";
import { mapper } from "../mapper/messageMapper";
import { IMessageEmbed } from "../types";
import { CordeTextChannel } from "./cordeTextChannel";
import { CordeGuild } from "./cordeGuild";
import { CordeRole } from "./cordeRole";
import { CordeDMChannel } from "./cordeDMChannel";
import { CordeNewsChannel } from "./cordeNewsChannel";

interface Author {
  id: string;
  isBot: boolean;
  createdAt: Date;
  username: string;
}

/**
 * Encapsulation of [Discord.js Message](https://discord.js.org/#/docs/main/master/class/Message)
 *
 * @see https://discord.com/developers/docs/resources/channel#message-object
 */
export class CordeMessage {
  private _message: Message;
  constructor(message: Message) {
    if (message.partial) {
      throw new Error("message loaded can not be partial");
    }

    this._message = message;
  }

  /**
   * Group activity
   */
  get activity() {
    return this._message.activity;
  }

  /**
   * Id of the channel the message was sent in.
   */
  get channelId() {
    return this._message.channel.id;
  }

  /**
   * Id of the guild the message was sent in.
   */
  get guildId() {
    return this._message.guild?.id;
  }

  /**
   * Supplemental application information for group activities
   */
  get application() {
    return this._message.application;
  }

  /**
   * A collection of attachments in the message - e.g. Pictures - mapped by their ID
   */
  get attachments() {
    return this._message.attachments;
  }

  /**
   * The author of the message
   */
  get author(): Author {
    const author = this._message.author;
    return {
      id: author.id,
      isBot: author.bot,
      createdAt: author.createdAt,
      username: author.username,
    };
  }

  /**
   * The channel that the message was sent in.
   */
  get channel() {
    if (this._message.channel.type === "text") {
      return new CordeTextChannel(this._message.channel);
    }

    if (this._message.channel.type === "dm") {
      return new CordeDMChannel(this._message.channel);
    }

    return new CordeNewsChannel(this._message.channel);
  }

  /**
   * The content of the message.
   */
  get content() {
    return this._message.content;
  }

  /**
   * Whether this was a TTS (Text-to-Speech) message.
   */
  get tts() {
    return this._message.tts;
  }

  /**
   * Whether this message mentions everyone.
   */
  get mentionEveryone() {
    return this._message.mentions.everyone;
  }

  /**
   * Roles specifically mentioned in this message.
   */
  get mentionedRoles() {
    return this._message.mentions.roles.array().map((role) => new CordeRole(role));
  }

  /**
   * Roles specifically mentioned in this message.
   */
  get mentionedChannels() {
    return this._message.mentions.channels.array().map((channel) => new CordeTextChannel(channel));
  }

  /**
   * Used for validating a message was sent.
   */
  get nonce() {
    return this._message.nonce;
  }

  /**
   * The time the message was sent at
   */
  get createdAt() {
    return this._message.createdAt;
  }

  /**
   * Whether the message is deletable by the client user
   */
  get isDeletable() {
    return this._message.deletable;
  }

  /**
   * Whether this message has been deleted
   */
  get isDeleted() {
    return this._message.deleted;
  }

  /**
   * Whether the message is editable by the client user
   */
  get isEditable() {
    return this._message.editable;
  }

  /**
   * The time the message was last edited at (if applicable)
   */
  get editedAt() {
    return this._message.editedAt;
  }

  /**
   * A list of embeds in the message - e.g. YouTube Player
   */
  get embeds() {
    return this._message.embeds.map((embed) => mapper.messageEmbedToMessageEmbedInterface(embed));
  }

  /**
   * Flags that are applied to the message
   */
  get flags() {
    return this._message.flags;
  }

  /**
   * The guild the message was sent in (if in a guild channel)
   */
  get guild() {
    if (this._message.guild) {
      return new CordeGuild(this._message.guild);
    }
    return null;
  }

  /**
   * Id of the message.
   */
  get id() {
    return this._message.id;
  }

  /**
   * Represents the author of the message as a guild member.
   * Only available if the message comes from a guild where the author is still a member.
   */
  get authorAsGuildMember() {
    // TODO: Map GuildMember
    return this._message.member;
  }

  /**
   * All valid mentions that the message contains
   */
  get mentions() {
    // TODO: map MessageMentions
    return this._message.mentions;
  }

  /**
   * Whether the message is pinnable by the client user
   */
  get isPinneable() {
    return this._message.pinnable;
  }

  /**
   * Whether or not this message is pinned
   */
  get isPinned() {
    return this._message.pinned;
  }

  /**
   * Array with reactions belonging to this message
   */
  get reactions() {
    // TODO: map MessageReaction
    return this._message.reactions.cache.array();
  }

  /**
   * Message reference data
   */
  get reference() {
    return this._message.reference;
  }

  /**
   * Whether or not this message was sent by Discord, not actually a user (e.g. pin notifications)
   */
  get isAuthorSystem() {
    return this._message.system;
  }

  /**
   * The type of the message.
   *
   * @see https://discord.com/developers/docs/resources/channel#message-object-message-types
   */
  get type() {
    return this._message.type;
  }

  /**
   * The url to jump to this message
   */
  get url() {
    return this._message.url;
  }

  /**
   * ID of the webhook that sent the message, if applicable
   */
  get webhookID() {
    return this._message.webhookID;
  }

  /**
   * Deletes this message.
   *
   * @example
   *
   * try {
   *   const msg = await message.delete();
   *   console.log(`Deleted message from ${msg.author.username}`);
   * } catch(e) {
   *   console.error(e);
   * }
   *
   * @returns This.
   */
  async delete() {
    await this._message.delete();
    return this;
  }

  /**
   * Edits the content of the message.
   * @param newContent The new content for the message
   * @param embed The options to provide
   *
   * @example
   *
   * try {
   *   const msg = await message.edit('This is my new content!');
   *   console.log(`Updated the content of a message to ${msg.content}`)
   * } catch(e) {
   *   console.error(e);
   * }
   *
   * @returns This.
   */
  async edit(newContent: string | number | boolean | bigint): Promise<CordeMessage>;
  async edit(newContent: string | number | boolean | bigint, embed?: IMessageEmbed) {
    if (embed) {
      const mappedEmbed = mapper.embedInterfaceToMessageEmbed(embed);
      await this._message.edit(newContent, mappedEmbed);
      return this;
    }

    await this._message.edit(newContent);
    return this;
  }

  /**
   * Pins this message to the channel's pinned messages.
   * If the message is already pinned or if it is not pinneable,
   * Then no async operation is made.
   *
   * @example
   *
   * try {
   *   const msg = await message.pin();
   *   console.log(`message ${msg.id} was pinned`);
   * } catch(e) {
   *   console.error(e);
   * }
   *
   * @returns This.
   *
   */
  async pin() {
    if (!this.isPinned && this.isPinneable) {
      await this._message.pin();
    }
    return this;
  }

  /**
   * Adds a reaction to the message.
   *
   * @param emoji The emoji to react with.
   *
   * @example
   *
   * try {
   *   const reaction = await message.react('🤔');
   *   console.log(`reaction ${reaction.id} was added`);
   * } catch(e) {
   *   console.error(e);
   * }
   *
   * @returns Reaction added to message.
   */
  async react(emoji: string | GuildEmoji | ReactionEmoji) {
    // TODO: map MessageReaction.
    const reaction = await this._message.react(emoji);
    return reaction;
  }

  /**
   * Send an inline reply to this message.
   *
   * @param content The content for the message
   * @param embed The additional options to provide
   *
   * @example
   *
   * try {
   *   const msg = message.reply('This is a reply!');
   *   console.log(`Replied to message "${msg.content}"`);
   * } catch(e) {
   *   console.error(e);
   * }
   *
   * @returns Reaction added to message.
   */
  async reply(content: string | number | boolean | bigint): Promise<CordeMessage>;
  async reply(content: string | number | boolean | bigint, embed?: IMessageEmbed) {
    if (embed) {
      const mappedEmbed = mapper.embedInterfaceToMessageEmbed(embed);
      await this._message.reply(content, mappedEmbed);
      return this;
    }

    await this._message.reply(content);
    return this;
  }

  /**
   * Suppresses or unsuppresses embeds on a message.
   * @param suppress Whether the embeds should be suppressed or not
   */
  async suppressEmbeds(suppress?: boolean) {
    await this._message.suppressEmbeds(suppress);
    return this;
  }

  /**
   * Unpins this message from the channel's pinned messages.
   * If the message is not pinned or if it is not pinneable,
   * Then no async operation is made.
   *
   * @example
   *
   * try {
   *   const msg = await message.unPin();
   *   console.log(`message ${msg.id} was pinned`);
   * } catch(e) {
   *   console.error(e);
   * }
   *
   * @returns This.
   *
   */
  async unpin() {
    if (this.isPinned && this.isPinneable) {
      await this._message.unpin();
    }
    return this;
  }
}
