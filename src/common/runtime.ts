import { ConfigOptions, testFunctionType } from "../types/types";
import { Config } from "./config";
import { Client } from "discord.js";
import { CordeBot } from "../core";
import { ConfigError } from "../errors";

class Runtime {
  private static _instance: Runtime;

  public configFilePath: string;
  public files: string[];

  private readonly _configs: Config;
  private _bot: CordeBot;

  public get bot() {
    return this._bot;
  }

  public get events() {
    return this._bot.events;
  }

  public get configs() {
    return this._configs;
  }

  public get cordeTestToken() {
    return this._configs.cordeTestToken;
  }

  public get botTestId() {
    return this._configs.botTestId;
  }

  public get botTestToken() {
    return this._configs.botTestToken;
  }

  public get channelId() {
    return this._configs.channelId;
  }

  public get guildId() {
    return this._configs.guildId;
  }

  public get timeOut() {
    return this._configs.timeOut;
  }

  public get botPrefix() {
    return this._configs.botPrefix;
  }

  public get testFiles() {
    return this._configs.testFiles;
  }

  public set testFiles(path: string[]) {
    this._configs.testFiles = path;
  }

  private constructor() {
    this._configs = new Config();
  }

  public static getInstance() {
    if (!Runtime._instance) {
      Runtime._instance = new Runtime();
    }
    return Runtime._instance;
  }

  public setConfigs(_configs: ConfigOptions, forceUpdate?: boolean) {
    if (!_configs) {
      throw new ConfigError("Invalid _configs");
    }

    this._configs.setConfigs(_configs, forceUpdate);
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
      this._configs.botPrefix,
      this._configs.guildId,
      this._configs.channelId,
      this._configs.timeOut,
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
