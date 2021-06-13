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
  Channel,
  ChannelPosition,
  ChannelResolvable,
  DefaultMessageNotifications,
  ExplicitContentFilterLevel,
  Guild as DGuild,
  GuildEditData,
  GuildMemberResolvable,
  GuildWidgetData,
  RolePosition,
} from "discord.js";
import {
  GuildFeaturesType,
  SystemChannelFlagsResolvable,
  VerificationLevel,
  VerificationLevelType,
} from "../types";
import { Locale } from "../types";
import { IGuildSnapshot } from "../types/snapshot";
import { AbstractEntity } from "./SnapshotlyEntity";

/**
 * Descriptive encapsulation of [Discord.js Guild](https://discord.js.org/#/docs/main/stable/class/Guild)
 *
 * @see https://discord.com/developers/docs/resources/guild
 */
export class Guild extends AbstractEntity<IGuildSnapshot> implements IGuildSnapshot {
  constructor(private _guild: DGuild) {
    super();
  }

  get afkChannelID(): string | null {
    return this._guild.afkChannelID;
  }

  get afkTimeout() {
    return this._guild.afkTimeout;
  }

  get applicationID() {
    return this._guild.applicationID;
  }

  get approximateMemberCount() {
    return this._guild.approximateMemberCount;
  }

  get approximatePresenceCount() {
    return this._guild.approximatePresenceCount;
  }

  get isAvailable() {
    return this._guild.available;
  }

  get banner() {
    return this._guild.banner;
  }

  get isDeleted() {
    return this._guild.deleted;
  }

  get description() {
    return this._guild.description;
  }

  get discoverySplash() {
    return this._guild.discoverySplash;
  }

  get icon() {
    return this._guild.icon;
  }

  get id() {
    return this._guild.id;
  }

  get joinedAt() {
    return this._guild.joinedAt;
  }

  get isLarge() {
    return this._guild.large;
  }

  get maximumMembers() {
    return this._guild.maximumMembers;
  }

  get maximumPresences() {
    return this._guild.maximumPresences;
  }

  get membersCount() {
    return this._guild.memberCount;
  }

  get mfaLevel() {
    return this._guild.mfaLevel;
  }

  get name() {
    return this._guild.name;
  }

  get ownerId() {
    return this._guild.ownerID;
  }

  get isPartnered() {
    return this._guild.partnered;
  }

  get preferredLocale() {
    return this._guild.preferredLocale;
  }

  get premiumSubscriptionCount() {
    return this._guild.premiumSubscriptionCount;
  }

  get publicUpdatesChannelId() {
    return this._guild.publicUpdatesChannelID;
  }

  get region() {
    return this._guild.region;
  }

  get features(): GuildFeaturesType[] {
    return this._guild.features;
  }

  get isVerified() {
    return this._guild.verified;
  }

  get defaultMessageNotifications() {
    return this._guild.defaultMessageNotifications;
  }

  /**
   * Delete a guild permanently. User must be owner. Returns `204 No Content` on success.
   * Fires a [Guild Delete](https://discord.com/developers/docs/topics/gateway#guild-delete) Gateway event.
   *
   * @see https://discord.com/developers/docs/topics/gateway#guild-delete
   */
  async delete() {
    await this._guild.delete();
  }

  /**
   * Edits the name of the guild.
   *
   * @param newName New name of this guild.
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateName('Discord Guild')
   */
  async updateName(newName: string) {
    const guild = await this._guild.setName(newName);
    this._guild = guild;
    return this;
  }

  /**
   * Edits the preferred locale of the guild.
   *
   * @param newPreferredLocale  new preferred locale
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updatePreferredLocale('en-US')
   */
  async updatePreferredLocale(newPreferredLocale: Locale) {
    const guild = await this._guild.setPreferredLocale(newPreferredLocale);
    this._guild = guild;
    return this;
  }

  /**
   * Edits the region of the guild.
   *
   * @param newRegion new region of this guild.
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateRegion('london')
   */
  async updateRegion(newRegion: string) {
    const guild = await this._guild.setRegion(newRegion);
    this._guild = guild;
    return this;
  }

  /**
   * Sets a new guild banner.
   * @param newBanner new banner file path.
   * @returns This guild updated.
   *
   * @see https://discord.com/developers/docs/reference#image-formatting
   *
   * @example
   *
   *  guild.updateBanner('./banner.png')
   */
  async updateBanner(newBanner: string): Promise<this>;
  async updateBanner(newBanner: Buffer): Promise<this>;
  async updateBanner(newBanner: string | Buffer) {
    const guild = await this.executeWithErrorOverride(() => this._guild.setBanner(newBanner));
    this._guild = guild;
    return this;
  }

  /**
   * Sets a new guild invite splash image.
   * @param newSplash The new invite splash image of the guild
   * @returns This guild updated.
   *
   * @see https://discord.com/developers/docs/reference#image-formatting
   *
   * @example
   *
   * guild.updateSplash('./splash.png')
   */
  async updateSplash(newSplash: string): Promise<this>;
  async updateSplash(newSplash: Buffer): Promise<this>;
  async updateSplash(newSplash: string | Buffer) {
    const guild = await this.executeWithErrorOverride(() => this._guild.setSplash(newSplash));
    this._guild = guild;
    return this;
  }

  /**
   * Edits the [verification level](https://discord.com/developers/docs/resources/guild#guild-object-verification-level)
   * of the guild.
   *
   * @param verificationLevel The new verification level of the guild
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateVerificationLevel(1)
   */
  async updateVerificationLevel(verificationLevel: number): Promise<this>;
  async updateVerificationLevel(verificationLevel: VerificationLevel): Promise<this>;
  async updateVerificationLevel(verificationLevel: VerificationLevelType): Promise<this>;
  async updateVerificationLevel(
    verificationLevel: VerificationLevel | number | VerificationLevelType,
  ) {
    const guild = await this.executeWithErrorOverride(() =>
      this._guild.setVerificationLevel(verificationLevel),
    );
    this._guild = guild;
    return this;
  }

  /**
   * Edits the flags of the default message notifications of the guild.
   * @param newSystemChannelFlags The new flags for the default message notifications
   * @returns This guild updated.
   *
   * @see https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags
   *
   * @example
   *
   * guild.updateSystemChannelFlags("WELCOME_MESSAGE_DISABLED");
   */
  async updateSystemChannelFlags(
    newSystemChannelFlags: SystemChannelFlagsResolvable,
  ): Promise<this> {
    const guild = await this.executeWithErrorOverride(() =>
      this._guild.setSystemChannelFlags(newSystemChannelFlags),
    );
    this._guild = guild;
    return this;
  }

  /**
   * Edits the guild's widget.
   *
   * @description Channel id that the widget will generate an
   * invite to, or null if set to no invite.
   *
   * @param newWidget The widget for the guild
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateWidget({
   *    enabled: true,
   *    channel: "123"
   * });
   */
  async updateWidget(newWidget: GuildWidgetData) {
    this._guild = await this.executeWithErrorOverride(() => this._guild.setWidget(newWidget));
    return this;
  }

  /**
   * Edits the system channel of the guild.
   *
   * @description id or object of the channel where guild notices such
   *  as welcome messages and boost events are posted
   *
   * @param newSystemChannel The new system channel
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateSystemChannel('1231241')
   */
  async updateSystemChannel(newChannelId: string): Promise<this>;
  async updateSystemChannel(newChannel: Channel): Promise<this>;
  async updateSystemChannel(newChannel: string | Channel) {
    this._guild = await this.executeWithErrorOverride(() =>
      this._guild.setSystemChannel(newChannel),
    );
    return this;
  }

  /**
   * Edits the rules channel of the guild.
   *
   * @description Id or the object of the channel where Community
   * guilds can display rules and/or guidelines.
   *
   * @param newChannelId The new rules channel
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateRulesChannel("121312");
   */
  async updateRulesChannel(newChannelId: string): Promise<this>;
  async updateRulesChannel(newChannel: Channel): Promise<this>;
  async updateRulesChannel(newChannel: string | Channel) {
    this._guild = await this.executeWithErrorOverride(() =>
      this._guild.setRulesChannel(newChannel),
    );
    return this;
  }

  /**
   * Batch-updates the guild's role positions
   * @param newRolePositions Role positions to update
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateRolePosition(
   *  { role: roleID, position: updatedRoleIndex },
   *  { role: role2ID, position: updatedRole2Index })
   */
  async updateRolePosition(...newRolePositions: RolePosition[]) {
    this._guild = await this.executeWithErrorOverride(() =>
      this._guild.setRolePositions(newRolePositions),
    );
    return this;
  }

  /**
   * Edits the community updates channel of the guild.
   *
   * @description Id or object of the channel where admins and moderators of
   * Community guilds receive notices from Discord.
   *
   * @param newPublicUpdatesChannel The new community updates channel
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updatePublicUpdatesChannel("12312312")
   */
  async updatePublicUpdatesChannel(newPublicUpdatesChannel: string): Promise<this>;
  async updatePublicUpdatesChannel(newPublicUpdatesChannel: Channel): Promise<this>;
  async updatePublicUpdatesChannel(newPublicUpdatesChannel: string | Channel) {
    this._guild = await this.executeWithErrorOverride(() =>
      this._guild.setPublicUpdatesChannel(newPublicUpdatesChannel),
    );
    return this;
  }

  /**
   * Sets a new owner of the guild.
   * @param newOwner The new owner of the guild
   * @returns This guild updated.
   *
   * @example
   *
   * guild.setOwner(guild.members.cache.first())
   */
  async updateOwner(newOwner: GuildMemberResolvable) {
    this._guild = await this.executeWithErrorOverride(() => this._guild.setOwner(newOwner));
    return this;
  }

  /**
   * Sets a new guild icon.
   *
   * @param newIcon The new icon of the guild
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateIcon('./icon.png')
   */
  async updateIcon(newIcon: string): Promise<this>;
  async updateIcon(newIcon: Buffer): Promise<this>;
  async updateIcon(newIcon: string | Buffer) {
    this._guild = await this.executeWithErrorOverride(() => this._guild.setIcon(newIcon));
    return this;
  }

  /**
   * Edits the level of the explicit content filter.
   * @param newExplicitContentFilter The new level of the explicit content filter
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateExplicitContentFilter("MEMBERS_WITHOUT_ROLES")
   */
  async updateExplicitContentFilter(newExplicitContentFilter: number): Promise<this>;
  async updateExplicitContentFilter(
    newExplicitContentFilter: ExplicitContentFilterLevel,
  ): Promise<this>;
  async updateExplicitContentFilter(newExplicitContentFilter: number | ExplicitContentFilterLevel) {
    this._guild = await this.executeWithErrorOverride(() =>
      this._guild.setExplicitContentFilter(newExplicitContentFilter),
    );
    return this;
  }

  /**
   * Sets a new guild discovery splash image.
   * @param newDiscoverySplash The new discovery splash image of the guild
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateDiscoverySplash('./discoverysplash.png')
   */
  async updateDiscoverySplash(newDiscoverySplash: string): Promise<this>;
  async updateDiscoverySplash(newDiscoverySplash: Buffer): Promise<this>;
  async updateDiscoverySplash(newDiscoverySplash: string | Buffer) {
    this._guild = await this.executeWithErrorOverride(() =>
      this._guild.setDiscoverySplash(newDiscoverySplash),
    );
    return this;
  }

  /**
   * Edits the setting of the default message notifications of the guild.
   *
   * @param newDefaultMessageNotifications The new setting for the default message notifications
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateDefaultMessageNotifications("ONLY_MENTIONS");
   */
  async updateDefaultMessageNotifications(newDefaultMessageNotifications: number): Promise<this>;
  async updateDefaultMessageNotifications(
    newDefaultMessageNotifications: DefaultMessageNotifications,
  ): Promise<this>;
  async updateDefaultMessageNotifications(
    newDefaultMessageNotifications: number | DefaultMessageNotifications,
  ) {
    this._guild = await this.executeWithErrorOverride(() =>
      this._guild.setDefaultMessageNotifications(newDefaultMessageNotifications),
    );
    return this;
  }

  /**
   * Batch-updates the guild's channels' positions.
   *
   * @param newChannelPositions Channel positions to update
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateChannelPositions(
   * { channel: channelID, position: newChannelIndex },
   * { channel: channel2ID, position: newChannel2Index })
   */
  async updateChannelPositions(...newChannelPositions: ChannelPosition[]) {
    this._guild = await this.executeWithErrorOverride(() =>
      this._guild.setChannelPositions(newChannelPositions),
    );
    return this;
  }

  /**
   * Edits the AFK timeout of the guild.
   * @param newAfkTimeout The time in seconds that a user must be idle to be considered AFK
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateAFKTimeout(60)
   */
  async updateAFKTimeout(newAfkTimeout: number) {
    this._guild = await this.executeWithErrorOverride(() =>
      this._guild.setAFKTimeout(newAfkTimeout),
    );
    return this;
  }

  /**
   * Edits the AFK channel of the guild.
   * @param newAfkChannel The new AFK channel
   * @returns This guild updated.
   *
   * @example
   *
   * guild.updateAFKChannel(channel)
   */
  async updateAFKChannel(newAfkChannel: string): Promise<this>;
  async updateAFKChannel(newAfkChannel: Channel): Promise<this>;
  async updateAFKChannel(newAfkChannel: ChannelResolvable) {
    this._guild = await this.executeWithErrorOverride(() =>
      this._guild.setAFKChannel(newAfkChannel),
    );
    return this;
  }

  /**
   * Updates the guild with new information - e.g. a new name.
   *
   * @param newGuildData The data to update the guild with
   * @returns This guild updated.
   *
   * @example
   *
   * guild.update({
   *    name: 'Discord Guild',
   *    region: 'london',
   * })
   */
  async update(newGuildData: GuildEditData) {
    this._guild = await this.executeWithErrorOverride(() => this._guild.edit(newGuildData));
    return this;
  }
}
