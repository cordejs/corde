import * as Discord from 'discord.js';
import ConfigOptions from '../models';
import CordeBot from './cordeBot';

export const DEFAULT_TEST_TIMEOUT = 5000;

/**
 * Default interface of json config
 *
 * @description `botTestToken` is not required.
 * only inform if is desired to start test bot with corde
 *
 * @implements ConfigOptions
 */
class Config implements ConfigOptions {
  cordeTestToken: string;
  botTestId: string;
  botTestToken?: string;
  channelId: string;
  guildId: string;
  timeOut?: number;
  botPrefix: string;
  testFilesDir: string;
  message: Discord.Message;
  files: string[];
}

class Runtime {
  configs: Config;
  bot: CordeBot;

  constructor() {
    this.bot = new CordeBot();
    this.configs = new Config();
  }

  setConfigs(configs: ConfigOptions) {
    this.configs.botPrefix = configs.botPrefix;
    this.configs.botTestId = configs.botTestId;
    this.configs.botTestToken = configs.botTestToken;
    this.configs.channelId = configs.channelId;
    this.configs.cordeTestToken = configs.cordeTestToken;
    this.configs.guildId = configs.guildId;
    this.configs.testFilesDir = configs.testFilesDir;
    this.configs.timeOut = configs.timeOut;
    this.configs.files = [];
  }

  loadBotSettings() {
    this.bot.loadChannel(this.guildId, this.channelId);
  }

  get channelId() {
    return this.configs.channelId;
  }

  get guildId() {
    return this.configs.guildId;
  }

  get obverseBotStart() {
    return this.bot.hasInited;
  }
}

const runtime = new Runtime();
export default runtime;
