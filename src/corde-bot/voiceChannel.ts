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

import { StreamOptions, VoiceChannel } from "discord.js";
import internal from "stream";
import { AudioStream } from "./audioStream";

/**
 * Encapsulate functions of a voice channel connection.
 */
export class DescriptiveVoiceChannel {
  private _audioStream?: AudioStream;

  get stream() {
    return this._audioStream;
  }

  constructor(private voiceChannel: VoiceChannel) {}

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
  async play(input: string | internal.Readable, options?: StreamOptions) {
    const con = await this.voiceChannel.join();
    const dispatcher = con.play(input, options);
    if (dispatcher) {
      this._audioStream = new AudioStream(dispatcher);
    }
    return this._audioStream;
  }

  /**
   * Disconnects the voice connection, causing a disconnect and closing event to be emitted.
   */
  disconnect() {
    this.voiceChannel?.leave();
    this._audioStream?.destroy();
    this._audioStream = undefined;
    return this;
  }
}
