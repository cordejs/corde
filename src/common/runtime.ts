import { IConfigOptions, ICordeBot, TestFunctionType } from "../types";
import { Config } from "./config";
import { Client } from "discord.js";
import { CordeBot } from "../core/cordeBot";
import { ConfigError } from "../errors";

const Environment = {
  isUnityTest: process.env.ENV === "UNITY_TEST",
  isE2eTest: process.env.ENV === "E2E_TEST",
};

/**
 * @internal
 */
class Runtime implements IConfigOptions {
  get bot() {
    if (!this._bot) {
      this._bot = this.initBot();
    }

    return this._bot;
  }

  get isTestEnv() {
    return this.environment.isE2eTest || this.environment.isUnityTest;
  }

  get environment() {
    return Environment;
  }

  get exitOnFileReadingError() {
    return this._configs.exitOnFileReadingError;
  }

  get extensions() {
    return this._configs.extentions;
  }

  get events() {
    return this.bot.events;
  }

  get configs() {
    return this._configs;
  }

  get cordeBotToken() {
    return this._configs.cordeBotToken;
  }

  get botTestId() {
    return this._configs.botTestId;
  }

  get project() {
    return this._configs.project;
  }

  get botToken() {
    return this._configs.botToken;
  }

  get channelId() {
    return this._configs.channelId;
  }

  get guildId() {
    return this._configs.guildId;
  }

  get timeout() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._configs.timeout!;
  }

  get botPrefix() {
    return this._configs.botPrefix;
  }

  get testMatches() {
    return this._configs.testMatches;
  }

  get modulePathIgnorePatterns() {
    return this._configs.modulePathIgnorePatterns;
  }

  private constructor() {
    this._configs = new Config();
  }

  private static _instance: Runtime;
  configFilePath!: string;
  files!: string[];

  private readonly _configs: Config;
  private _bot!: ICordeBot;

  static getInstance() {
    if (!Runtime._instance) {
      Runtime._instance = new Runtime();
    }
    return Runtime._instance;
  }

  setConfigs(_configs: Partial<IConfigOptions>, forceUpdate?: boolean) {
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
    if (this._bot) {
      this._bot.logout();
    }
  }

  async loginBot(token: string) {
    return await this.bot.login(token);
  }

  injectBot(fn: TestFunctionType) {
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
