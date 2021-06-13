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

import { GuildMember as DGuildMember } from "discord.js";
import { IGuildMemberSnapshot } from "../types/snapshot";
import { RolePermission } from "../utils";
import { Guild } from "./Guild";
import { Message } from "./Message";
import { Role } from "./Role";
import { AbstractEntity } from "./SnapshotlyEntity";

export class GuildMember
  extends AbstractEntity<IGuildMemberSnapshot>
  implements IGuildMemberSnapshot
{
  private _guildMember: DGuildMember;
  /**
   * Initialize a new CordeGuildMember
   * @param guildMember Discord.js object
   * @throws Error if the GuildMember is `partial`
   */
  constructor(guildMember: DGuildMember) {
    super();
    if (guildMember.partial) {
      throw new Error("can not load a partial guildMember");
    }

    this._guildMember = guildMember;
  }

  get isBanneable() {
    return this._guildMember.bannable;
  }

  get isDeleted() {
    return this._guildMember.deleted;
  }

  get displayColor() {
    return this._guildMember.displayColor;
  }

  get displayHexColor() {
    return this._guildMember.displayHexColor;
  }

  get guild() {
    return new Guild(this._guildMember.guild);
  }

  get id() {
    return this._guildMember.id;
  }

  get joinedAt() {
    return this._guildMember.joinedAt;
  }

  get isKickeable() {
    return this._guildMember.kickable;
  }

  get lastMessage(): Message | undefined {
    if (this._guildMember.lastMessage) {
      return new Message(this._guildMember.lastMessage);
    }
    return undefined;
  }

  get lastMessageChannelID() {
    return this._guildMember.lastMessageChannelID;
  }

  get lastMessageID() {
    return this._guildMember.lastMessageID;
  }

  get isManageable() {
    return this._guildMember.manageable;
  }

  get nickName() {
    return this._guildMember.nickname;
  }

  get permissions() {
    return this._guildMember.permissions.toArray() as RolePermission[];
  }

  get premiumSince() {
    return this._guildMember.premiumSince;
  }

  get presence() {
    // TODO: Map Presence
    return this._guildMember.presence;
  }

  get roles() {
    return this._guildMember.roles.cache.map((role) => new Role(role));
  }

  get user() {
    // TODO: map User
    return this._guildMember.user;
  }

  get voiceState() {
    // TODO: map VoiceState
    return this._guildMember.voice;
  }

  /**
   * Bans this guild member.
   *
   * @param daysOfBan Number of days of messages to delete, must be between `0` and `0`, inclusive
   *
   * @example
   *
   * try {
   *    guildMember.ban(7);
   * } catch(e) {
   *    console.error(e);
   * }
   *
   * @returns This.
   */
  async ban(): Promise<this>;
  async ban(daysOfBan: number): Promise<this>;
  async ban(daysOfBan?: number): Promise<this> {
    if (daysOfBan) {
      this._guildMember = await this.executeWithErrorOverride(() =>
        this._guildMember.ban({ days: daysOfBan }),
      );
    } else {
      this._guildMember = await this.executeWithErrorOverride(() => this._guildMember.ban());
    }

    return this;
  }
}
