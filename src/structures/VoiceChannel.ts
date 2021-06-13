import { VoiceChannel as DVoiceChannel } from "discord.js";
import { IVoiceChannelSnapshot } from "../types/snapshot";
import { AbstractEntity } from "./SnapshotlyEntity";

export class VoiceChannel
  extends AbstractEntity<IVoiceChannelSnapshot>
  implements IVoiceChannelSnapshot
{
  constructor(private _vmChannel: DVoiceChannel) {
    super();
  }

  get isEditable() {
    return this._vmChannel.editable;
  }

  get isFull() {
    return this._vmChannel.full;
  }

  get isJoinable() {
    return this._vmChannel.joinable;
  }

  get isSpeakable() {
    return this._vmChannel.speakable;
  }

  get userLimit() {
    return this._vmChannel.userLimit;
  }

  /**
   * Leaves this voice channel.
   */
  leave() {
    this._vmChannel.leave();
  }

  /**
   * Sets the bitrate of the channel.
   * @param value The new bitrate
   * @returns this instance
   */
  async setBitrate(value: number) {
    this._vmChannel = await this._vmChannel.setBitrate(value);
    return this;
  }

  /**
   * Sets the user limit of the channel.
   * @param limit The new user limit
   * @returns this instance
   */
  async setUserLimit(limit: number) {
    this._vmChannel = await this._vmChannel.setUserLimit(limit);
    return this;
  }
}
