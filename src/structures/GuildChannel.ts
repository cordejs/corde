import {
  CategoryChannel,
  ChannelData,
  GuildChannel as DGuildChannel,
  GuildChannelCloneOptions,
  InviteOptions,
  OverwriteResolvable,
  PermissionOverwriteOption,
  RoleResolvable,
  UserResolvable,
} from "discord.js";
import { IGuildChannelSnapshot } from "../types/snapshot";
import { Channel } from "./Channel";
import { GuildMember } from "./GuildMember";

export class GuildChannel
  extends Channel<DGuildChannel, IGuildChannelSnapshot>
  implements IGuildChannelSnapshot
{
  private _guildChannel: DGuildChannel;
  constructor(guildChannel: DGuildChannel) {
    super(guildChannel);
    this._guildChannel = guildChannel;
  }

  get isPermissionsLocked() {
    return this._guildChannel.permissionsLocked ?? undefined;
  }

  get calculatedPosition() {
    return this._guildChannel.calculatedPosition;
  }

  get isDeletable() {
    return this._guildChannel.deletable;
  }

  get isManageable() {
    return this._guildChannel.manageable;
  }

  get members() {
    return this._guildChannel.members.map((member) => new GuildMember(member));
  }

  get name() {
    return this._guildChannel.name;
  }

  get parentID() {
    return this._guildChannel.parentID ?? undefined;
  }

  get position() {
    return this._guildChannel.position;
  }

  get rawPosition() {
    return this._guildChannel.rawPosition;
  }

  get type() {
    return this._guildChannel.type;
  }

  get isViewable() {
    return this._guildChannel.viewable;
  }

  /**
   * Clones this channel.
   * @param options Clone options
   * @returns this instance
   */
  async clone(options?: GuildChannelCloneOptions) {
    this._guildChannel = await this.executeWithErrorOverride(() =>
      this._guildChannel.clone(options),
    );
    return this;
  }

  /**
   * Creates an invite to this guild channel.
   * @param options Options for the invite
   * @returns this instance
   */
  async createInvite(options?: InviteOptions) {
    // TODO: Map invite
    return await this.executeWithErrorOverride(() => this._guildChannel.createInvite(options));
  }

  /**
   * Edits the channel.
   * @param data The new data for the channel
   * @returns this instance updated
   */
  async edit(data: ChannelData) {
    this._guildChannel = await this.executeWithErrorOverride(() => this._guildChannel.edit(data));
    return this;
  }

  /**
   * Fetches a collection of invites to this guild channel. Resolves with a collection mapping invites by their codes.
   * @returns invites fetched
   */
  async fetchInvites() {
    // TODO: Map invite
    return await this.executeWithErrorOverride(() => this._guildChannel.fetchInvites());
  }

  /**
   * Locks in the permission overwrites from the parent channel.
   * @returns this instance
   */
  async lockPermissions() {
    this._guildChannel = await this.executeWithErrorOverride(() =>
      this._guildChannel.lockPermissions(),
    );
    return this;
  }

  /**
   * Replaces the permission overwrites in this channel.
   * @param overwrites Permission overwrites the channel gets updated with
   * @returns this instance
   */
  async overwritePermissions(overwrites: OverwriteResolvable[]) {
    await this.executeWithErrorOverride(() => this.overwritePermissions(overwrites));
    return this;
  }

  /**
   * Sets a new name for the guild channel.
   * @param newName The new name for the guild channel
   * @returns this instance
   */
  async updateName(newName: string) {
    this._guildChannel = await this.executeWithErrorOverride(() =>
      this._guildChannel.setName(newName),
    );
    return this;
  }

  /**
   * Sets the category parent of this channel.
   * @param channel Parent channel
   * @param options Options to pass
   * @returns this instance
   */
  async updateParent(
    channel?: CategoryChannel | string,
    options?: { lockPermissions?: boolean; reason?: string },
  ) {
    this._guildChannel = await this.executeWithErrorOverride(() =>
      this._guildChannel.setParent(channel ?? null, options),
    );
    return this;
  }

  /**
   * Sets a new position for the guild channel.
   * @param position The new position for the guild channel
   * @param options Options for setting position
   * @returns this instance
   */
  async updatePosition(position: number, options?: { relative?: boolean; reason?: string }) {
    this._guildChannel = await this.executeWithErrorOverride(() =>
      this._guildChannel.setPosition(position, options),
    );
    return this;
  }

  /**
   * Sets a new topic for the guild channel.
   * @param topic The new topic for the guild channel
   * @returns This instance.
   */
  async updateTopic(topic?: string) {
    this._guildChannel = await this.executeWithErrorOverride(() =>
      this._guildChannel.setTopic(topic ?? null),
    );
    return this;
  }

  /**
   * Updates Overwrites for a user or role in this channel. (creates if non-existent)
   * @param userOrRole The user or role to update
   * @param options The options for the update
   * @returns this instance
   */
  async updateOverwrite(
    userOrRole: RoleResolvable | UserResolvable,
    options: PermissionOverwriteOption,
  ) {
    this._guildChannel = await this.executeWithErrorOverride(() =>
      this._guildChannel.updateOverwrite(userOrRole, options),
    );
    return this;
  }
}
