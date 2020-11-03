import ConfigOptions from "../types";

/**
 * Default interface of json config
 *
 * @description `botTestToken` is not required.
 * only inform if is desired to start test bot with corde
 *
 */
export class Config implements ConfigOptions {
  public cordeTestToken: string;
  public botTestId: string;
  public botTestToken?: string;
  public channelId: string;
  public guildId: string;
  public timeOut?: number;
  public botPrefix: string;
  public testFiles: string[];

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
   * config.setNoFiledConfigsOptions(newConfig);
   * console.log(config.timeOut) // print 1000;
   *
   * @param config new set of configs.
   */
  public setNoFiledConfigsOptions(config: ConfigOptions) {
    if (!this.cordeTestToken) {
      this.cordeTestToken = config.cordeTestToken;
    }

    if (!this.botPrefix) {
      this.botPrefix = config.botPrefix;
    }

    if (!this.botTestId) {
      this.botTestId = config.botTestId;
    }

    if (!this.botTestToken) {
      this.botTestToken = config.botTestToken;
    }

    if (!this.channelId) {
      this.channelId = config.channelId;
    }

    if (!this.guildId) {
      this.guildId = config.guildId;
    }

    if (!this.timeOut) {
      this.timeOut = config.timeOut;
    }

    if (!this.botPrefix) {
      this.botPrefix = config.botPrefix;
    }

    if (!this.testFiles || this.testFiles.length === 0) {
      this.testFiles = config.testFiles;
    }
  }
}
