import { Config } from '../core/config';
import ConfigOptions from '../models';
import { CordeBot } from './cordeBot';

class Runtime {
  bot: CordeBot;
  configFilePath: string;
  files: string[];
  configs: Config;

  constructor() {
    this.configs = new Config();
  }

  setConfigs(configs: ConfigOptions) {
    if (!configs) {
      throw new Error('Invalid Configs');
    }

    if (!this.configs) {
      this.configs = new Config();
    }

    this.configs.botPrefix = configs.botPrefix;
    this.configs.botTestId = configs.botTestId;
    this.configs.botTestToken = configs.botTestToken;
    this.configs.channelId = configs.channelId;
    this.configs.cordeTestToken = configs.cordeTestToken;
    this.configs.guildId = configs.guildId;
    this.configs.testFilesDir = configs.testFilesDir;
    this.configs.timeOut = configs.timeOut;

    this.loadBot();
  }

  private loadBot() {
    this.bot = new CordeBot(
      this.configs.botPrefix,
      this.configs.guildId,
      this.configs.channelId,
      this.configs.timeOut,
      this.configs.botTestId,
    );
  }
}

const runtime = new Runtime();
export default runtime;
