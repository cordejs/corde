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
  exitOnFileReadingError?: boolean;
  typeCheck?: boolean;
  extentions?: string[];

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
      if (config[key] && (!this[key] || forceUpdate)) {
        (this[key] as any) = config[key];
      }
    }
  }
}
