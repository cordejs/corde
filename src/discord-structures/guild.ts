import { Guild } from "discord.js";
import {
  Base64Resolvable,
  GuildFeatures,
  SystemChannelFlagsResolvable,
  VerificationLevel,
} from "../discordTypes";

/**
 * Encapsulation of [Discord.js Guild](https://discord.js.org/#/docs/main/stable/class/Guild)
 *
 * @see https://discord.com/developers/docs/resources/guild
 */
export class CordeGuild {
  constructor(private _guild: Guild) {}

  /**
   * The ID of the voice channel where AFK members are moved
   */
  get afkChannelID(): string {
    return this._guild.afkChannelID;
  }

  /**
   * The time in seconds before a user is counted as "away from keyboard"
   */
  get afkTimeout() {
    return this._guild.afkTimeout;
  }

  /**
   * The ID of the application that created this guild (if applicable)
   */
  get aplicationID() {
    return this._guild.applicationID;
  }

  /**
   * The approximate amount of members the guild has.
   *
   * *Needs call **fetch** if you want to receive this parameter*
   */
  get approximateMemberCount() {
    return this._guild.approximateMemberCount;
  }

  /**
   * The approximate amount of presences the guild has.
   *
   * *Needs call **fetch** if you want to receive this parameter*
   */
  get approximatePresenceCount() {
    return this._guild.approximatePresenceCount;
  }

  /**
   * Whether the guild is available to access. If it is not available, it indicates a server outage.
   */
  get isAvailable() {
    return this._guild.available;
  }

  /**
   * The hash of the guild banner.
   */
  get banner() {
    return this._guild.banner;
  }

  /**
   * Whether the bot has been removed from the guild.
   */
  get isDeleted() {
    return this._guild.deleted;
  }

  /**
   * The description of the guild, if any.
   */
  get description() {
    return this._guild.description;
  }

  /**
   * The hash of the guild discovery splash image.
   */
  get discoverySplash() {
    return this._guild.discoverySplash;
  }

  /**
   * The hash of the guild icon.
   */
  get icon() {
    return this._guild.icon;
  }

  /**
   * The Unique ID of the guild, useful for comparisons.
   */
  get id() {
    return this._guild.id;
  }

  /**
   * The time corde's bot joined the guild.
   */
  get joinedAt() {
    return this._guild.joinedAt;
  }

  /**
   * Whether has more than large_threshold members, 50 by default.
   */
  get isLarge() {
    return this._guild.large;
  }

  /**
   * The maximum amount of members the guild can have.
   */
  get maximumMembers() {
    return this._guild.maximumMembers;
  }

  /**
   * The maximum amount of presences the guild can have.
   *
   * *Needs call **fetch** if you want to receive this parameter*
   */
  get maximumPresences() {
    return this._guild.maximumPresences;
  }

  /**
   * The full amount of members in this guild.
   */
  get membersCount() {
    return this._guild.memberCount;
  }

  /**
   * The required MFA level for the guild
   *
   * @see https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
   */
  get mfaLevel() {
    return this._guild.mfaLevel;
  }

  /**
   * The name of the guild
   */
  get name() {
    return this._guild.name;
  }

  /**
   * The user ID of this guild's owner
   */
  get ownerId() {
    return this._guild.ownerID;
  }

  /**
   * If this guild is partnered
   */
  get isPartnered() {
    return this._guild.partnered;
  }

  /**
   * The preferred locale of a Community guild.
   * Used in server discovery and notices from Discord.
   *
   * Default is `en-US`
   */
  get preferredLocale() {
    return this._guild.preferredLocale;
  }

  /**
   * The total number of boosts for this server
   */
  get premiumSubscriptionCount() {
    return this._guild.premiumSubscriptionCount;
  }

  /**
   * The ID of the community updates channel for the guild
   */
  get publicUpdatesChannelId() {
    return this._guild.publicUpdatesChannelID;
  }

  /**
   * The region the guild is located in
   *
   * @see https://discord.com/developers/docs/resources/voice#voice-region-object
   */
  get region() {
    return this._guild.region;
  }

  /**
   * An array of guild features partnered guilds have enabled.
   *
   * @see https://discord.com/developers/docs/resources/guild#guild-object-guild-features
   */
  get features(): GuildFeatures[] {
    return this._guild.features;
  }

  /**
   * If this guild is verified
   */
  get isVerified() {
    return this._guild.verified;
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
   *  Edits the name of the guild.
   * @param newName New name of this guild.
   * @returns This guild updated.
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
   */
  async updatePreferredLocale(newPreferredLocale: string) {
    const guild = await this._guild.setPreferredLocale(newPreferredLocale);
    this._guild = guild;
    return this;
  }

  /**
   * Edits the region of the guild.
   * @param newRegion new region of this guild.
   * @returns This guild updated.
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
   * @example
   *
   *  guild.updateBanner('./banner.png')
   */
  async updateBanner(newBanner: Base64Resolvable | null) {
    const guild = await this._guild.setBanner(newBanner);
    this._guild = guild;
    return this;
  }

  /**
   *
   */
  async updateSplash(newSplash: Base64Resolvable | null) {
    const guild = await this._guild.setSplash(newSplash);
    this._guild = guild;
    return this;
  }

  /**
   *
   */
  async updateVerificationLevel(verificationLevel: VerificationLevel | number) {
    const guild = await this._guild.setVerificationLevel(verificationLevel);
    this._guild = guild;
    return this;
  }

  /**
   *
   */
  async updateSystemChannelFlags(newSystemChannelFlags: SystemChannelFlagsResolvable) {
    const guild = await this._guild.setSystemChannelFlags(newSystemChannelFlags);
    this._guild = guild;
    return this;
  }
}
