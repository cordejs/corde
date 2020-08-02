import ConfigOptions, { testFunctionType } from "../interfaces";
import { Config } from "./config";
import { CordeBot } from "../core";

class Runtime {
  private static _instance: Runtime;
  private bot: CordeBot;
  public configFilePath: string;
  public files: string[];
  public configs: Config;

  private constructor() {
    this.configs = new Config();
  }

  public static getInstance() {
    if (!Runtime._instance) {
      Runtime._instance = new Runtime();
    }
    return Runtime._instance;
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

  public isBotLoggedIn() {
    return this.bot && this.bot.isLoggedIn();
  }

  public logoffBot() {
    if (this.bot) {
      this.bot.logout();
    }
  }

  public onBotStart() {
    return this.bot.onStart;
  }

  public async loginBot(token: string) {
    return await this.bot.login(token);
  }

  public injectBot(fn: testFunctionType) {
    return fn(this.bot);
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

/**
 * Singleton of Runtime.
 */
const runtime = Runtime.getInstance();
export { runtime };
