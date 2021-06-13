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
  TextChannel as DTextChannel,
} from "discord.js";
import { ITextChannelSnapshot } from "../types/snapshot";
import { Guild } from "./Guild";
import { GuildMember } from "./GuildMember";
import { TextBasedChannel } from "./TextBasedChannel";

interface WebhookOptions {
  avatar?: Buffer | string;
  reason?: string;
}

/**
 * Encapsulation of [Discord.js TextChannel](https://discord.js.org/#/docs/main/master/class/TextChannel).
 */
export class TextChannel
  extends TextBasedChannel<DTextChannel, ITextChannelSnapshot>
  implements ITextChannelSnapshot
{
  constructor(channel: DTextChannel) {
    super(channel);
  }

  get isDeletable() {
    return this._channel.deletable;
  }

  get guild() {
    return new Guild(this._channel.guild);
  }

  get isManageable() {
    return this._channel.manageable;
  }

  get members() {
    return this._channel.members.map((member) => new GuildMember(member));
  }

  get name() {
    return this._channel.name;
  }

  get nsfw() {
    return this._channel.nsfw;
  }

  get permissionOverwrites() {
    // TODO: map PermissionOverwrites
    return this._channel.permissionOverwrites.array();
  }

  get permissionsLocked() {
    return this._channel.permissionsLocked;
  }

  get position() {
    return this._channel.position;
  }

  get rateLimitPerUser() {
    return this._channel.rateLimitPerUser;
  }

  get rawPosition() {
    return this._channel.rawPosition;
  }

  get topic() {
    return this._channel.topic;
  }

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
    return new TextChannel(clone);
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

    this._channel = (await this._channel.delete()) as DTextChannel;
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
