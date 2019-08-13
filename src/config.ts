import * as Discord from "discord.js";

/**
 * Contains a set of properties needed for execution of Concord
 */
export interface IConfigOptions {
  readonly concordTestToken: string;
  readonly botTestId: string;
  readonly botTestToken?: string;
  readonly channelId?: string;
  readonly guildId: string;
  readonly timeOut?: number;
  readonly botPrefix: string;
  readonly testFilesDir: string;
  message: Discord.Message;
  channel: Discord.TextChannel;
  files: string[];
}

/**
 * Default interface of json config
 * @public
 * @description `botTestToken` is not required.
 * only inform if is desired to start test bot with concord
 * @implements IConfigOptions
 */
export class Config implements IConfigOptions {
  /**
   * Fake bot used to test the realy one
   */
  public readonly concordTestToken: string;
  /**
   * User's bot that will be tested
   */
  public readonly botTestId: string;
  /**
   * User's bot token that will run.
   */
  public readonly botTestToken?: string;
  /**
   * Channel where tests will run
   */
  public readonly channelId?: string;
  /**
   * Guild where tests will run
   */
  public readonly guildId: string;
  /**
   * Defines max amount of time that a command can run
   */
  public readonly timeOut?: number;
  /**
   * Defines how indentify bot calls
   */
  public readonly botPrefix: string;
  /**
   * Path for case tests. Use this from the base directory of the application
   */
  public readonly testFilesDir: string;
  /**
   * Discord message where all tests will run
   */
  public message: Discord.Message;
  /**
   * Connected channel on bot login
   */
  public channel: Discord.TextChannel;
  /**
   * All tests files
   */
  public files: string[];

  constructor(configs: IConfigOptions) {
    this.botPrefix = configs.botPrefix;
    this.botTestId = configs.botTestId;
    this.botTestToken = configs.botTestToken;
    this.channelId = configs.channelId;
    this.concordTestToken = configs.concordTestToken;
    this.guildId = configs.guildId;
    this.testFilesDir = configs.testFilesDir;
    this.timeOut = configs.timeOut;
    this.files = [];
  }

}
