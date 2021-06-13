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

import { StreamDispatcher } from "discord.js";

export class AudioStream {
  private _streamDispatcher: StreamDispatcher;

  constructor(streamDispatcher: StreamDispatcher) {
    this._streamDispatcher = streamDispatcher;
  }

  /**
   * Whether or not playback is paused
   */
  get isPaused() {
    return this._streamDispatcher?.paused;
  }

  /**
   * The time that the stream was paused at (null if not paused)
   */
  get pausedSince() {
    return this._streamDispatcher?.pausedSince;
  }

  /**
   * Total time that this dispatcher has been paused in milliseconds
   */
  get pausedTotalTime() {
    return this._streamDispatcher?.pausedTime;
  }

  /**
   * The time (in milliseconds) that the dispatcher has actually been playing audio for
   */
  get streamTime() {
    return this._streamDispatcher?.streamTime;
  }

  /**
   * The time (in milliseconds) that the dispatcher has been playing audio for, taking into account skips and pauses
   */
  get totalStreamTime() {
    return this._streamDispatcher?.streamTime;
  }

  /**
   * The current volume of the stream
   */
  get volume() {
    return this._streamDispatcher?.volume;
  }

  /**
   * The current volume of the stream in decibels
   */
  get volumeInDecibels() {
    return this._streamDispatcher?.volumeDecibels;
  }

  /**
   * Whether or not the volume of this stream is editable
   */
  get isVolumeEditable() {
    return this._streamDispatcher?.volumeEditable;
  }

  /**
   * The current volume of the stream from a logarithmic scale
   */
  get volumeLogarithmic() {
    return this._streamDispatcher?.volumeEditable;
  }

  /**
   * Pauses playback
   * @param silent Whether to play silence while paused to prevent audio glitches
   * @returns This instance
   */
  pause(silent = true) {
    this._streamDispatcher.pause(silent);
    return this;
  }

  /**
   * Resumes playback
   * @returns This instance
   */
  resume() {
    this._streamDispatcher.resume();
    return this;
  }

  /**
   * Set the bitrate of the current Opus encoder if using a compatible Opus stream.
   * @param value New bitrate, in kbps If set to 'auto', the voice channel's bitrate will be used
   * @returns true if the bitrate has been successfully changed.
   */
  setBitRate(value: number | "auto") {
    return this._streamDispatcher.setBitrate(value);
  }

  /**
   * Enables or disables Forward Error Correction if using a compatible Opus stream.
   * @param enabled true to enable
   * @returns Returns true if it was successfully set.
   */
  setFEC(enabled: boolean) {
    return this._streamDispatcher.setFEC(enabled);
  }

  /**
   * Sets the expected packet loss percentage if using a compatible Opus stream.
   * @param value between 0 and 1
   * @returns Returns true if it was successfully set.
   */
  setPLP(value: number) {
    return this._streamDispatcher.setPLP(value);
  }

  /**
   * Sets the volume relative to the input stream - i.e. 1 is normal, 0.5 is half, 2 is double.
   * @param volume The volume that you want to set
   * @returns this instance
   */
  setVolume(volume: number) {
    this._streamDispatcher.setVolume(volume);
    return this;
  }

  /**
   * Sets the volume in decibels.
   * @param decibelsValue The decibels
   * @returns this instance.
   */
  setVolumeDecibels(decibelsValue: number) {
    this._streamDispatcher.setVolumeDecibels(decibelsValue);
    return this;
  }

  /**
   * Sets the volume so that a perceived value of 0.5 is half the perceived volume etc.
   * @param value The value for the volume
   * @returns this instance.
   */
  setVolumeLogarithmic(value: number) {
    this._streamDispatcher.setVolumeLogarithmic(value);
    return this;
  }

  /**
   * Destroys this stream
   */
  destroy() {
    this._streamDispatcher.destroy();
  }
}
