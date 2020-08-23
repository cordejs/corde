import ConfigOptions, { testFunctionType } from "../types";
import { Config } from "./config";
import { CordeBot } from "../core";
import { Client } from "discord.js";
import { ConfigError } from "../errors";

class Runtime {
  private static _instance: Runtime;
  public configFilePath: string;
  public files: string[];
  public configs: Config;

  public get bot() {
    return this._bot;
  }

  private _bot: CordeBot;

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
      throw new ConfigError("Invalid Configs");
    }

    if (!this.configs) {
      this.configs = new Config();
    }
    this.configs = configs;
    this.loadBot();
  }

  /**
   * Shortcut for *bot.isLoggedIn*
   */
  public isBotLoggedIn() {
    return this._bot && this._bot.isLoggedIn();
  }

  /**
   * Shortcut for *bot.logout*
   */
  public logoffBot() {
    if (this._bot) {
      this._bot.logout();
    }
  }

  /**
   * Shortcut for *bot.onStart*
   */
  public onBotStart() {
    return this._bot.onStart;
  }

  public async loginBot(token: string) {
    return await this._bot.login(token);
  }

  public injectBot(fn: testFunctionType) {
    return fn(this._bot);
  }

  private loadBot() {
    this._bot = new CordeBot(
      this.configs.botPrefix,
      this.configs.guildId,
      this.configs.channelId,
      this.configs.timeOut,
      this.configs.botTestId,
      new Client(),
    );
  }
}

/**
 * Singleton of Runtime.
 */
const runtime = Runtime.getInstance();
export { runtime };
