/**
 * All references and documentation are from Discord.js
 * and Discord API documentations.
 *
 * Thanks Discord.js for the rich documentation that helped so much ❤️
 *
 * @see https://discord.js.org/#/docs/main/stable/general/welcome
 * @see https://discord.com/developers/docs/intro
 * @see https://discordjs.guide/
 * @see https://github.com/discordjs/guide
 */

import {
  ChannelData,
  GuildChannelCloneOptions,
  InviteOptions,
  OverwriteData,
  TextChannel,
} from "discord.js";
import { CordeGuild } from "./cordeGuild";
import { CordeTextBasedChannel } from "./cordeTextBasedChannel";

interface WebhookOptions {
  avatar?: Buffer | string;
  reason?: string;
}

/**
 * Encapsulation of [Discord.js TextChannel](https://discord.js.org/#/docs/main/master/class/TextChannel).
 */
export class CordeTextChannel extends CordeTextBasedChannel<TextChannel> {
  constructor(channel: TextChannel) {
    super(channel);
  }

  /**
   * Whether the channel is deletable by the client user.
   */
  get isDeletable() {
    return this._channel.deletable;
  }

  /**
   * The guild the channel is in
   */
  get guild() {
    return new CordeGuild(this._channel.guild);
  }

  /**
   * Whether the channel is manageable by the client user.
   */
  get isManageable() {
    return this._channel.manageable;
  }

  /**
   * A collection of cached members of this channel, mapped by their ID.
   * Members that can view this channel, if the channel is text based. Members in the channel, if the channel is voice based.
   */
  get members() {
    // TODO: map GuildMember
    return this._channel.members.array();
  }

  /**
   * The name of the guild channel.
   */
  get name() {
    return this._channel.name;
  }

  /**
   * Whether the guild considers this channel NSFW (Not Safe for Work)
   */
  get nsfw() {
    return this._channel.nsfw;
  }

  /**
   * A list of permission overwrites in this channel for roles and users
   */
  get permissionOverwrites() {
    // TODO: map PermissionOverwrites
    return this._channel.permissionOverwrites.array();
  }

  /**
   * If the permissionOverwrites match the parent channel, null if no parent.
   */
  get permissionsLocked() {
    return this._channel.permissionsLocked;
  }

  /**
   * The position of the channel
   */
  get position() {
    return this._channel.position;
  }

  /**
   * The ratelimit per user for this channel in seconds.
   */
  get rateLimitPerUser() {
    return this._channel.rateLimitPerUser;
  }

  /**
   * The raw position of the channel from discord.
   */
  get rawPosition() {
    return this._channel.rawPosition;
  }

  get topic() {
    return this._channel.topic;
  }

  /**
   * Whether the channel is viewable by the client user.
   */
  get isViewable() {
    return this._channel.viewable;
  }

  /**
   * Clones this channel.
   *
   * @param options Custom properties in channel clone.
   * @returns The cloned channel.
   */
  async clone(options?: GuildChannelCloneOptions) {
    const clone = await this._channel.clone(options);
    return new CordeTextChannel(clone);
  }

  /**
   * Creates an invite to this guild channel.
   * @param options Options for the invite
   * @returns Created invite.
   */
  async createInvite(options?: InviteOptions) {
    // TODO: map Invite
    const invite = await this._channel.createInvite(options);
    return invite;
  }

  /**
   * Creates a webhook for the channel.
   *
   * @param name The name of the webhook
   * @param options Options for creating the webhook
   *
   * @example
   *
   * try {
   * const webhook = await channel.createWebhook('hook', {
   *    avatar: 'https://cdn.discordapp.com/attachments/266332527764045834/849829889753874452/IMG_20210602_164817.jpg',
   *    reason: 'Needed a cool new Webhook'
   * });
   * } catch(e) {
   *    console.error(e);
   * }
   *
   * @returns Created webhook
   */
  async createWebhook(name: string, options?: WebhookOptions) {
    //TODO: map WebHook;
    const webhook = await this._channel.createWebhook(name, options);
    return webhook;
  }

  /**
   * Deletes this channel.
   * @returns This.
   */
  async delete() {
    if (this.isDeleted) {
      return this;
    }

    this._channel = (await this._channel.delete()) as TextChannel;
    return this;
  }

  /**
   * Edits the channel.
   * @param data The new data for the channel
   * @returns This
   */
  async edit(data: ChannelData) {
    this._channel = await this._channel.edit(data);
    return this;
  }

  /**
   * Locks in the permission overwrites from the parent channel.
   * @returns This.
   */
  async lockPermissions() {
    this._channel = await this._channel.lockPermissions();
    return this;
  }

  /**
   * Replaces the permission overwrites in this channel.
   * @param overwrites Permission overwrites the channel gets updated with.
   *
   * @example
   *
   * channel.overwritePermissions([
   *   {
   *      id: message.author.id,
   *      deny: [Permissions.FLAGS.VIEW_CHANNEL],
   *   },
   * ], 'Needed to change permissions');
   *
   * @returns This.
   */
  async overwritePermissions(overwrites: OverwriteData[]) {
    this._channel = await this._channel.overwritePermissions(overwrites);
    return this;
  }

  /**
   * Sets a new name for the guild channel.
   * @param newName The new name for the guild channel.
   *
   * @example
   *
   * try {
   *  const channel = await channel.setName('myNewName');
   * } catch(e) {
   *  console.error(e);
   * }
   *
   * @returns This.
   */
  async updateName(newName: string) {
    this._channel = await this._channel.setName(newName);
    return this;
  }

  /**
   * Sets whether this channel is flagged as NSFW.
   *
   * @param nsfw Whether the channel should be considered NSFW
   * @returns This.
   */
  async updateNSFW(nsfw: boolean) {
    this._channel = await this._channel.setNSFW(nsfw);
    return this;
  }

  /**
   * Sets a new position for the guild channel.
   *
   * @param newPosition The new position for the guild channel
   * @returns This.
   */
  async updatePosition(newPosition: number) {
    this._channel = await this._channel.setPosition(newPosition);
    return this;
  }

  /**
   * Sets a new topic for the guild channel.
   *
   * @param newTopic The new topic for the guild channel.
   *
   * @example
   *
   * try {
   *  const newTopic = await channel.setTopic('needs more rate limiting');
   *  console.log(`Channel's new topic is ${newTopic}`);
   * } catch(e) {
   *  console.error(e);
   * }
   *
   * @returns This.
   */
  async setTopic(newTopic: string) {
    this._channel = await this._channel.setTopic(newTopic);
    return this._channel.topic ?? "";
  }
}
