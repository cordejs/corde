import ConfigOptions from "../interfaces";
import { Config } from "./config";
import { CordeBot } from "../core";

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
    this.configs = configs;
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
export { runtime };
