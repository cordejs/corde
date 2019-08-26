import * as Discord from "discord.js";

/**
 * Contains a set of properties needed for execution of conncord
 */
export interface IConfigOptions {
  readonly conncordTestToken: string;
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
  executeInBotLogin: boolean;
}

/**
 * Default interface of json config
 * @public
 * @description `botTestToken` is not required.
 * only inform if is desired to start test bot with conncord
 * @implements IConfigOptions
 */
export class Config implements IConfigOptions {
  /**
   * Fake bot used to test the realy one
   */
  public readonly conncordTestToken: string;
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
  /**
   * Defines if tests execution must run
   * right after bot login
   * @default false
   */
  public executeInBotLogin: boolean;
  
  constructor(configs: IConfigOptions) {
    this.botPrefix = configs.botPrefix;
    this.botTestId = configs.botTestId;
    this.botTestToken = configs.botTestToken;
    this.channelId = configs.channelId;
    this.conncordTestToken = configs.conncordTestToken;
    this.guildId = configs.guildId;
    this.testFilesDir = configs.testFilesDir;
    this.timeOut = configs.timeOut;
    this.channel = null;
    this.files = [];
  }

}
