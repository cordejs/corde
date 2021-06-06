/**
 * All references and documentation is from Discord.js
 * and Discord API documentations.
 *
 * @see https://discord.js.org/#/docs/main/stable/general/welcome
 * @see https://discord.com/developers/docs/intro
 */

import { GuildMember } from "discord.js";
import { RolePermission } from "../utils";
import { CordeGuild } from "./cordeGuild";
import { CordeMessage } from "./cordeMessage";
import { CordeRole } from "./cordeRole";

export class CordeGuildMember {
  private _guildMember: GuildMember;
  /**
   * Initialize a new CordeGuildMember
   * @param guildMember Discord.js object
   * @throws Error if the GuildMember is `partial`
   */
  constructor(guildMember: GuildMember) {
    if (guildMember.partial) {
      throw new Error("can not load a partial guildMember");
    }

    this._guildMember = guildMember;
  }

  /**
   * Whether this member is bannable by the client user
   */
  get isBanneable() {
    return this._guildMember.bannable;
  }

  /**
   * Whether the member has been removed from the guild
   */
  get isDeleted() {
    return this._guildMember.deleted;
  }

  /**
   * The displayed color of this member in base 10
   */
  get displayColor() {
    return this._guildMember.displayColor;
  }

  /**
   * The nickname of this member, or their username if they don't have one.
   */
  get displayHexColor() {
    return this._guildMember.displayHexColor;
  }

  /**
   * The guild that this member is part of.
   */
  get guild() {
    return new CordeGuild(this._guildMember.guild);
  }

  /**
   * The ID of this member
   */
  get id() {
    return this._guildMember.id;
  }

  /**
   * The time this member joined the guild
   */
  get joinedAt() {
    return this._guildMember.joinedAt;
  }

  /**
   * Whether this member is kickable by the client user
   */
  get isKickeable() {
    return this._guildMember.kickable;
  }

  /**
   * The Message object of the last message sent by the member in their guild, if one was sent.
   */
  get lastMessage() {
    if (this._guildMember.lastMessage) {
      return new CordeMessage(this._guildMember.lastMessage);
    }
    return null;
  }

  /**
   * The ID of the channel for the last message sent by the member in their guild, if one was sent
   */
  get lastMessageChannelID() {
    return this._guildMember.lastMessageChannelID;
  }

  /**
   * The ID of the last message sent by the member in their guild, if one was sent
   */
  get lastMessageID() {
    return this._guildMember.lastMessageID;
  }

  /**
   * Whether the client user is above this user in the hierarchy, according to role position and guild ownership.
   * This is a prerequisite for many moderative actions.
   */
  get isManageable() {
    return this._guildMember.manageable;
  }

  /**
   * The nickname of this member, if they have one.
   */
  get nickName() {
    return this._guildMember.nickname;
  }

  /**
   * The overall set of permissions for this member, taking only roles and owner status into account
   */
  get permissions() {
    return this._guildMember.permissions.toArray() as RolePermission[];
  }

  /**
   * The overall set of permissions for this member, taking only roles and owner status into account
   */
  get premiumSince() {
    return this._guildMember.premiumSince;
  }

  /**
   * The presence of this guild member
   */
  get presence() {
    // TODO: Map Presence
    return this._guildMember.presence;
  }

  /**
   * A list of roles belonging to this member
   */
  get roles() {
    return this._guildMember.roles.cache.map((role) => new CordeRole(role));
  }

  /**
   * The user that this guild member instance represents
   */
  get user() {
    // TODO: map User
    return this._guildMember.user;
  }

  /**
   * The voice state of this member
   */
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
      this._guildMember = await this._guildMember.ban({ days: daysOfBan });
    } else {
      this._guildMember = await this._guildMember.ban();
    }

    return this;
  }
}
