import * as Discord from 'discord.js';

/**
 * Contains a set of properties needed for execution of corde
 */
export interface ConfigOptions {
  /**
   * Fake bot used to test the realy one
   */
  cordeTestToken: string;
  /**
   * User's bot that will be tested
   */
  botTestId: string;
  /**
   * User's bot token that will run.
   */
  botTestToken?: string;
  /**
   * Channel where tests will run
   */
  channelId?: string;
  /**
   * Guild where tests will run
   */
  guildId: string;
  /**
   * Defines max amount of time that a command can run
   */
  timeOut?: number;
  /**
   * Defines how indentify bot calls
   */
  botPrefix: string;
  /**
   * Path for case tests. Use this from the base directory of the application
   */
  testFilesDir: string;
  /**
   * Discord message where all tests will run
   */
  message: Discord.Message;
  /**
   * Connected channel on bot login
   */
  channel: Discord.TextChannel;
  /**
   * All tests files
   */
  files: string[];
  /**
   * Defines if tests execution must run
   * right after bot login
   * @default false
   */
  executeInBotLogin: boolean;
  /**
   * Defines if all tests must execute in silent mode.
   */
  silentMode: boolean;
  /**
   * Defines the function who will handle the messages to the
   * testing bot.
   */
  handlerFunction: (msg: Discord.Message) => void;
}
