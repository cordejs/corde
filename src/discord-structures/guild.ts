import { Guild as DiscordGuild } from "discord.js";
import {
  Base64Resolvable,
  GuildFeatures,
  SystemChannelFlagsResolvable,
  VerificationLevel,
} from "../discordTypes";

export class Guild {
  constructor(private _guild: DiscordGuild) {}

  get afkChannelID(): string | null {
    return this._guild.afkChannelID;
  }

  get afkTimeout() {
    return this._guild.afkTimeout;
  }

  get aplicationID() {
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

  get features(): GuildFeatures[] {
    return this._guild.features;
  }

  get isVerified() {
    return this._guild.verified;
  }

  async delete() {
    await this._guild.delete();
  }

  async updateName(newName: string) {
    const guild = await this._guild.setName(newName);
    this._guild = guild;
    return this;
  }

  async updatePreferredLocale(newPreferredLocale: string) {
    const guild = await this._guild.setPreferredLocale(newPreferredLocale);
    this._guild = guild;
    return this;
  }

  async updateRegion(newRegion: string) {
    const guild = await this._guild.setRegion(newRegion);
    this._guild = guild;
    return this;
  }

  async updateBanner(newBanner: Base64Resolvable | null) {
    const guild = await this._guild.setBanner(newBanner);
    this._guild = guild;
    return this;
  }

  async updateSplash(newSplash: Base64Resolvable | null) {
    const guild = await this._guild.setSplash(newSplash);
    this._guild = guild;
    return this;
  }

  async updateVerificationLevel(verificationLevel: VerificationLevel | number) {
    const guild = await this._guild.setVerificationLevel(verificationLevel);
    this._guild = guild;
    return this;
  }

  async updateSystemChannelFlags(newSystemChannelFlags: SystemChannelFlagsResolvable) {
    const guild = await this._guild.setSystemChannelFlags(newSystemChannelFlags);
    this._guild = guild;
    return this;
  }
}
