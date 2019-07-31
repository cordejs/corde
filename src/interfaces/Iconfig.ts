/**
 * Default interface of json config
 * @description `botTestToken` is not required.
 * only inform if is desired to start test bot with concord
 */
export declare interface IConfig {
  /**
   * Fake bot used to test the realy one
   */
  concordTestToken: string
  /**
   * User's bot that will be tested 
   */
  botTestId: string
  /**
   * User's bot token that will run.
   */
  botTestToken: string
  /**
   * Channel where tests will run
   */
  channelId: string
  /**
   * Guild where tests will run
   */
  guildId: string
  /**
   * Defines max amount of time that a command can run
   */
  timeOut?: number
  /**
   * Defines how indentify bot calls
   */
  botPrefix: string

  /**
   * Path for case tests. Use this from the base directory of the application
   */
  testFilesDir: string
}