import chalk from "chalk";
import { eventFactory } from "../../core/event/eventFactory";
import { Constructor, ICordeBot, IExpectTestParams, ITestReport } from "../../types";
import { buildReportMessage } from "../../utils/buildReportMessage";

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
  readonly timeout?: number;
  readonly testName: string;
  readonly isCascade: boolean;
  readonly guildId: string | undefined;
  readonly channelIdToSendCommand?: string;
  readonly channelId: string;
  readonly mustSendCommand: boolean;

  get client() {
    return this.cordeBot.client;
  }

  /**
   * Initialize the match class with its default values.
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
    mustSendCommand,
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
    this.mustSendCommand = mustSendCommand;
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
   * is cascade (this is often used only by the TodoInCascade test).
   *
   * @returns Message sent
   */
  sendCommandMessage(forceSend?: boolean) {
    // Tests in cascade controls when the message should be sent.
    if ((this.mustSendCommand || forceSend) && !this.command) {
      throw new Error("can not send a empty message");
    }

    if ((this.mustSendCommand || forceSend) && this.command) {
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

  getEvent<T>(type: Constructor<T>) {
    return eventFactory.findOrConstruct(type, this.client);
  }

  createMissingIntentError(titleMessage: string, intentsNeeded: string[]) {
    let intentLabel = "intent";

    if (intentsNeeded.length > 1) {
      intentLabel += "s";
    }

    return this.createFailedTest(
      chalk.red(titleMessage),
      "\n",
      chalk.red(
        `Try to add the ${intentLabel} ${chalk.cyan(intentsNeeded?.join(" or "))} in ${chalk.yellow(
          "intents",
        )} config`,
      ),
      `\n\n`,
      chalk.cyan(
        `Also check https://discordjs.guide/popular-topics/intents.html#privileged-intents`,
      ),
    );
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
