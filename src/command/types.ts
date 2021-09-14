import { ICordeBot, IExpectTestParams, ITestReport } from "../types";
/**
 * Entity helper for expectation assertions used for Corde tests
 *
 * @description Have 3 generic parameters that serves to define
 * what are the data that the test function will receive.
 *
 * These data will be used in action() command, witch will be implemented
 * by the inherited class.
 *
 */
export interface ICommandMatcherProps {
  expectation: any;
  hasPassed: boolean;
  readonly isNot: boolean;
  readonly command: string | number | boolean;
  readonly cordeBot: ICordeBot;
  readonly timeout: number;
  readonly testName: string;
  readonly isCascade: boolean;
  readonly guildId: string | undefined;
  readonly channelIdToSendCommand?: string;
  readonly channelId: string;

  invertHasPassedIfIsNot(): void;

  /**
   * Encapsulation of cordeBot.sendTextMessage
   * Sends `command` as message
   *
   * @param forceSend Defines if the message should be send even if the test if
   * is cascade (this is offen used only by the TodoInCascade test).
   *
   * @returns Message sent
   */
  sendCommandMessage(forceSend?: boolean): Promise<void> | Promise<import("discord.js").Message>;
  createFailedTest(...messages: (string | null | undefined)[]): ITestReport;
  createPassTest(): ITestReport;
  createReport(...messages: (string | null | undefined)[]): ITestReport;
}
