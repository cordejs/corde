import { IConfigOptions } from "../types";

/**
 * Default interface of JSON config
 *
 * @description `botToken` is not required.
 * only inform if is desired to start test bot with corde
 *
 */
export class Config implements IConfigOptions {
  private _cordeBotToken!: string;
  private _botTestId!: string;
  private _botToken!: string;
  private _channelId!: string;
  private _guildId!: string;
  private _timeout?: number;
  private _botPrefix!: string;
  private _testMatches!: string[];
  private _modulePathIgnorePatterns?: string[];
  private _project?: string;
  private _exitOnFileReadingError?: boolean;
  private _extentions?: string[];
  private _rootDir?: string;

  get cordeBotToken() {
    return this._cordeBotToken;
  }

  get botTestId() {
    return this._botTestId;
  }

  get botToken() {
    return this._botToken;
  }

  get channelId() {
    return this._channelId;
  }

  get guildId() {
    return this._guildId;
  }

  get timeout() {
    return this._timeout;
  }

  get botPrefix() {
    return this._botPrefix;
  }
  get testMatches() {
    return this._testMatches;
  }

  get modulePathIgnorePatterns() {
    return this._modulePathIgnorePatterns;
  }

  get project() {
    return this._project;
  }

  get exitOnFileReadingError() {
    return this._exitOnFileReadingError;
  }

  get extensions() {
    return this._extentions;
  }

  get rootDir() {
    return this._rootDir;
  }

  /**
   * Set values to config options that are not **filed** yet
   * It means that all options that are already with a value will not lose
   * this value
   *
   * @example
   * const config = new Config();
   * config.timeout = 1000;
   *
   * const newConfig: IConfigOptions = { ...timeout: 3000 };
   * config.setConfigs(newConfig);
   * console.log(config.timeout) // print 1000;
   *
   * @param config new set of configs.
   */
  setConfigs(config: Partial<IConfigOptions>, forceUpdate?: boolean) {
    const keys = Object.keys(config) as (keyof typeof config)[];
    for (const key of keys) {
      if (config[key] && (!this[this.getKey(key)] || forceUpdate)) {
        (this[this.getKey(key)] as any) = config[key];
      }
    }
  }

  private getKey(key: keyof IConfigOptions) {
    return (key = ("_" + key) as keyof IConfigOptions);
  }
}
