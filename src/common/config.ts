import { IConfigOptions } from "../types";

/**
 * Default interface of JSON config
 *
 * @description `botToken` is not required.
 * only inform if is desired to start test bot with corde
 *
 */
export class Config implements IConfigOptions {
  cordeBotToken!: string;
  botTestId!: string;
  botToken!: string;
  channelId!: string;
  guildId!: string;
  timeout?: number;
  botPrefix!: string;
  testMatches!: string[];
  modulePathIgnorePatterns?: string[];
  project?: string;

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
    if (config.cordeBotToken && (!this.cordeBotToken || forceUpdate)) {
      this.cordeBotToken = config.cordeBotToken;
    }

    if (config.botPrefix && (!this.botPrefix || forceUpdate)) {
      this.botPrefix = config.botPrefix;
    }

    if (config.botTestId && (!this.botTestId || forceUpdate)) {
      this.botTestId = config.botTestId;
    }

    if (config.botToken && (!this.botToken || forceUpdate)) {
      this.botToken = config.botToken;
    }

    if (config.project && (!this.project || forceUpdate)) {
      this.project = config.project;
    }

    if (config.channelId && (!this.channelId || forceUpdate)) {
      this.channelId = config.channelId;
    }

    if (config.guildId && (!this.guildId || forceUpdate)) {
      this.guildId = config.guildId;
    }

    if (config.timeout && (!this.timeout || forceUpdate)) {
      this.timeout = config.timeout;
    }

    if (config.botPrefix && (!this.botPrefix || forceUpdate)) {
      this.botPrefix = config.botPrefix;
    }

    if (config.modulePathIgnorePatterns && (!this.modulePathIgnorePatterns || forceUpdate)) {
      this.modulePathIgnorePatterns = config.modulePathIgnorePatterns;
    }

    if (config.testMatches && (!this.testMatches || this.testMatches.length === 0 || forceUpdate)) {
      this.testMatches = this.testMatches = Array.isArray(config.testMatches)
        ? config.testMatches
        : [];
    }
  }
}
