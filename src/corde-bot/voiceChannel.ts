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

import { StreamOptions } from "discord.js";
import internal from "stream";
import { ICordeBot } from "../types";
import { AudioStream } from "./audioStream";

/**
 * Encapsulate functions of a voice channel connection.
 */
export class VoiceChannel {
  private _bot: ICordeBot;
  private _audioStream?: AudioStream;

  get stream() {
    return this._audioStream;
  }

  constructor(bot: ICordeBot) {
    this._bot = bot;
  }

  /**
   * Play an audio resource.
   * @param input The resource to play.
   * @param options The options to play.
   *
   * @example
   *
   * // Play a local audio file
   * connection.play('/home/hydrabolt/audio.mp3', { volume: 0.5 });
   *
   * // Play a ReadableStream
   * connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { quality: 'highestaudio' }));
   *
   * // Using different protocols: https://ffmpeg.org/ffmpeg-protocols.html
   * connection.play('http://www.sample-videos.com/audio/mp3/wave.mp3');
   *
   * @returns this instance.
   */
  play(input: string | internal.Readable, options?: StreamOptions) {
    if (!this._bot.voiceConnection) {
      throw new Error("can not play something outside a voice connection");
    }

    const dispatcher = this._bot.voiceConnection.play(input, options);
    this._audioStream = new AudioStream(dispatcher);
    return this._audioStream;
  }

  /**
   * Disconnects the voice connection, causing a disconnect and closing event to be emitted.
   */
  disconnect() {
    this._bot.voiceConnection?.disconnect();
    this._audioStream?.destroy();
    this._audioStream = undefined;
    return this;
  }
}
