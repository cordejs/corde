import { DEFAULT_TEST_TIMEOUT } from "../consts";
import { ConfigOptions } from "../types";

/**
 * Default interface of json config
 *
 * @description `botTestToken` is not required.
 * only inform if is desired to start test bot with corde
 *
 */
export class Config implements ConfigOptions {
  cordeTestToken: string;
  botTestId: string;
  botTestToken?: string;
  channelId: string;
  guildId: string;
  timeOut: number;
  botPrefix: string;
  testFiles: string[];

  constructor() {
    this.timeOut = DEFAULT_TEST_TIMEOUT;
  }

  /**
   * Set values to config options that are not **filed** yet
   * It means that all options that are already with a value will not lose
   * this value
   *
   * @example
   * const config = new Config();
   * config.timeOut = 1000;
   *
   * const newConfig: ConfigOptions = { ...timeOut: 3000 };
   * config.setConfigs(newConfig);
   * console.log(config.timeOut) // print 1000;
   *
   * @param config new set of configs.
   */
  setConfigs(config: ConfigOptions, forceUpdate?: boolean) {
    if (!this.cordeTestToken || forceUpdate) {
      this.cordeTestToken = config.cordeTestToken;
    }

    if (!this.botPrefix || forceUpdate) {
      this.botPrefix = config.botPrefix;
    }

    if (!this.botTestId || forceUpdate) {
      this.botTestId = config.botTestId;
    }

    if (!this.botTestToken || forceUpdate) {
      this.botTestToken = config.botTestToken;
    }

    if (!this.channelId || forceUpdate) {
      this.channelId = config.channelId;
    }

    if (!this.guildId || forceUpdate) {
      this.guildId = config.guildId;
    }

    if (!this.timeOut || forceUpdate) {
      this.timeOut = config.timeOut;
    }

    if (!this.botPrefix || forceUpdate) {
      this.botPrefix = config.botPrefix;
    }

    if (!this.testFiles || this.testFiles.length === 0 || forceUpdate) {
      this.testFiles = config.testFiles;
    }
  }
}
