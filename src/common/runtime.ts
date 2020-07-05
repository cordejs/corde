import { CordeBotClient } from "../core";
import ConfigOptions, { CordeBot } from "../models";
import { Config } from "./config";

class Runtime {
  public bot: CordeBot;
  public configFilePath: string;
  public files: string[];
  public configs: Config;

  constructor() {
    this.configs = new Config();
  }

  public setConfigs(configs: ConfigOptions) {
    if (!configs) {
      throw new Error("Invalid Configs");
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
    this.configs.testFiles = configs.testFiles;
    this.configs.timeOut = configs.timeOut;

    this.loadBot();
  }

  private loadBot() {
    this.bot = new CordeBotClient(
      this.configs.botPrefix,
      this.configs.guildId,
      this.configs.channelId,
      this.configs.timeOut,
      this.configs.botTestId,
    );
  }
}

const runtime = new Runtime();
export { runtime };
