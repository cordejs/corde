import { ConfigOptions, testFunctionType } from "../types/types";
import { Config } from "./config";
import { Client } from "discord.js";
import { CordeBot } from "../core";
import { ConfigError } from "../errors";

class Runtime {
  configFilePath: string;
  files: string[];

  private readonly _configs: Config;
  private _bot: CordeBot;

  private static _instance: Runtime;

  get bot() {
    if (!this._bot) {
      this._bot = this.initBot();
    }

    return this._bot;
  }

  get events() {
    return this.bot.events;
  }

  get configs() {
    return this._configs;
  }

  get cordeTestToken() {
    return this._configs.cordeTestToken;
  }

  get botTestId() {
    return this._configs.botTestId;
  }

  get botTestToken() {
    return this._configs.botTestToken;
  }

  get channelId() {
    return this._configs.channelId;
  }

  get guildId() {
    return this._configs.guildId;
  }

  get timeOut() {
    return this._configs.timeOut;
  }

  get botPrefix() {
    return this._configs.botPrefix;
  }

  get testFiles() {
    return this._configs.testFiles;
  }

  set testFiles(path: string[]) {
    this._configs.testFiles = path;
  }

  private constructor() {
    this._configs = new Config();
  }

  static getInstance() {
    if (!Runtime._instance) {
      Runtime._instance = new Runtime();
    }
    return Runtime._instance;
  }

  setConfigs(_configs: ConfigOptions, forceUpdate?: boolean) {
    if (!_configs) {
      throw new ConfigError("Invalid _configs");
    }

    this._configs.setConfigs(_configs, forceUpdate);
  }

  /**
   * Shortcut for *bot.isLoggedIn*
   */
  isBotLoggedIn() {
    return this.bot && this.bot.isLoggedIn();
  }

  /**
   * Shortcut for *bot.logout*
   */
  logoffBot() {
    if (this.bot) {
      this.bot.logout();
    }
  }

  async loginBot(token: string) {
    return await this.bot.login(token);
  }

  injectBot(fn: testFunctionType) {
    return fn(this.bot);
  }

  initBot() {
    return new CordeBot(
      this._configs.botPrefix,
      this._configs.guildId,
      this._configs.channelId,
      this._configs.botTestId,
      new Client(),
    );
  }
}

/**
 * Singleton of Runtime.
 */
const runtime = Runtime.getInstance();
export { runtime };
