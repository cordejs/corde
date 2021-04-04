import { CordeBotLike, TestReport } from "../../types";
import { buildReportMessage } from "../../utils";
import { ExpectTestParams } from "../types";

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
export abstract class ExpectTest {
  protected expectation: any;
  protected hasPassed: boolean;

  protected readonly isNot: boolean;
  protected readonly command: string | number | boolean;
  protected readonly cordeBot: CordeBotLike;
  protected readonly timeOut: number;
  protected readonly testName: string;
  /**
   * Initialize the match class with its default values.
   *
   * @param cordeBot The instance of CordeBot initialized by the runtime.
   * @param command The command to execute.
   * @param isNot Definition if this is a deny test.
   */
  constructor(defaultParams: ExpectTestParams) {
    this.isNot = defaultParams.isNot;
    this.command = defaultParams.command;
    this.cordeBot = defaultParams.cordeBot;
    this.hasPassed = false;
    this.timeOut = defaultParams.timeout;
    this.testName = defaultParams.testName;
  }

  /**
   * Execute the test, checking if a command did what was proposed to do.
   *
   * @returns A report of the executed command.
   */
  abstract action(...args: any[]): Promise<TestReport>;

  protected invertHasPassedIfIsNot() {
    if (this.isNot) {
      this.hasPassed = !this.hasPassed;
    }
  }

  /**
   * Encapsulation of cordeBot.sendTextMessage
   * Sends `command` as message
   *
   * @returns Message sent
   */
  protected sendCommandMessage() {
    return this.cordeBot.sendTextMessage(this.command);
  }

  protected createFailedTest(message?: string): TestReport {
    return {
      pass: false,
      message,
      testName: this.testName,
    };
  }

  protected createPassTest(): TestReport {
    return {
      pass: true,
      testName: this.testName,
    };
  }
  protected createReport(...messages: (string | null | undefined)[]): TestReport {
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

  toString() {
    return this.testName ?? "ExpectTest";
  }
}
