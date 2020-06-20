import ConfigOptions from '../models';
import { Message } from 'discord.js';

/**
 * Default interface of json config
 *
 * @description `botTestToken` is not required.
 * only inform if is desired to start test bot with corde
 *
 * @implements ConfigOptions
 */
export class Config implements ConfigOptions {
  cordeTestToken: string;
  botTestId: string;
  botTestToken?: string;
  channelId: string;
  guildId: string;
  timeOut?: number;
  botPrefix: string;
  testFilesDir: string;
  message: Message;
  files: string[];
}
