import { ICordeBot, IExpectTestParams, ITestReport } from "../../types";
import { buildReportMessage } from "../../utils";

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
export class CommandState {
  expectation: any;
  hasPassed: boolean;

  readonly isNot: boolean;
  readonly command?: string | number | boolean;
  readonly cordeBot: ICordeBot;
  readonly timeout: number;
  readonly testName: string;
  readonly isCascade: boolean;
  readonly guildId: string | undefined;
  readonly channelIdToSendCommand?: string;
  readonly channelId: string;

  /**
   * Initialize the match class with its default values.
   *
   * @param cordeBot The instance of CordeBot initialized by the runtime.
   * @param command The command to execute.
   * @param isNot Definition if this is a deny test.
   */
  constructor({
    isNot,
    command,
    cordeBot,
    timeout,
    testName,
    isCascade,
    guildId,
    channelId,
    channelIdToSendCommand,
  }: IExpectTestParams) {
    this.isNot = isNot;
    this.command = command;
    this.cordeBot = cordeBot;
    this.hasPassed = false;
    this.timeout = timeout;
    this.testName = testName;
    this.isCascade = isCascade ?? false;
    this.guildId = guildId;
    this.channelIdToSendCommand = channelIdToSendCommand;
    this.channelId = channelId;
  }

  invertHasPassedIfIsNot() {
    if (this.isNot) {
      this.hasPassed = !this.hasPassed;
    }
  }

  /**
   * Encapsulation of cordeBot.sendTextMessage
   * Sends `command` as message
   *
   * @param forceSend Defines if the message should be send even if the test if
   * is cascade (this is offen used only by the TodoInCascade test).
   *
   * @returns Message sent
   */
  sendCommandMessage(forceSend?: boolean) {
    // Tests in cascade controus when the message should be sent.
    if (!this.isCascade || forceSend) {
      if (!this.command) {
        throw new Error("can not send a empty message");
      }
      return this.cordeBot.sendTextMessage(this.command, this.channelIdToSendCommand);
    }
    return Promise.resolve();
  }

  createFailedTest(...messages: (string | null | undefined)[]): ITestReport {
    const report = this.createReport(...messages);
    report.pass = false;
    return report;
  }

  createPassTest(): ITestReport {
    return {
      pass: true,
      testName: this.testName,
    };
  }

  createReport(...messages: (string | null | undefined)[]): ITestReport {
    let message = "";
    if (messages.length) {
      message = buildReportMessage(...messages);
    }

    return {
      testName: this.testName,
      pass: this.hasPassed,
      message,
    };
  }
}
