import * as Discord from 'discord.js';
import { Group } from './building/models';
import { BehaviorSubject } from 'rxjs';
/**
 * Contains a set of properties needed for execution of corde
 */
export interface ConfigOptions {
  cordeTestToken: string;
  botTestId: string;
  botTestToken?: string;
  channelId?: string;
  guildId: string;
  timeOut?: number;
  botPrefix: string;
  testFilesDir: string;
  message: Discord.Message;
  channel: Discord.TextChannel;
  files: string[];
  executeInBotLogin: boolean;
  silentMode: boolean;
  botFilePath: string;
}

/**
 * Default interface of json config
 * @public
 * @description `botTestToken` is not required.
 * only inform if is desired to start test bot with corde
 * @implements IConfigOptions
 */
class Config implements ConfigOptions {
  /**
   * Fake bot used to test the realy one
   */
  public cordeTestToken: string;
  /**
   * User's bot that will be tested
   */
  public botTestId: string;
  /**
   * User's bot token that will run.
   */
  public botTestToken?: string;
  /**
   * Channel where tests will run
   */
  public channelId?: string;
  /**
   * Guild where tests will run
   */
  public guildId: string;
  /**
   * Defines max amount of time that a command can run
   */
  public timeOut?: number;
  /**
   * Defines how indentify bot calls
   */
  public botPrefix: string;
  /**
   * Path for case tests. Use this from the base directory of the application
   */
  public testFilesDir: string;
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
  /**
   * Defines if all tests must execute in silent mode.
   */
  public silentMode: boolean;
  public botFilePath: string;
}

class Runtime extends Config {
  tests: Group[];
  cordeBotHasStarted = new BehaviorSubject<boolean>(false);

  loadFromConfigs(configs: ConfigOptions) {
    super.botPrefix = configs.botPrefix;
    this.botTestId = configs.botTestId;
    this.botTestToken = configs.botTestToken;
    this.channelId = configs.channelId;
    this.cordeTestToken = configs.cordeTestToken;
    this.guildId = configs.guildId;
    this.testFilesDir = configs.testFilesDir;
    this.timeOut = configs.timeOut;
    this.channel = null;
    this.files = [];
    this.silentMode = configs.silentMode;
    this.botFilePath = configs.botFilePath;
  }
}

const runtime = new Runtime();
export default runtime;
