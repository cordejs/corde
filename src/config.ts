import { Message, TextChannel } from 'discord.js';
/**
 * Contains a set of properties needed for execution of corde
 */
export default interface ConfigOptions {
  cordeTestToken: string;
  botTestId: string;
  botTestToken?: string;
  channelId?: string;
  guildId: string;
  timeOut?: number;
  botPrefix: string;
  testFilesDir: string;
  message: Message;
  channel: TextChannel;
  files: string[];
  executeInBotLogin: boolean;
  silentMode: boolean;
}
