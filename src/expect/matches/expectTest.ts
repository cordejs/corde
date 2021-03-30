import { runtime } from "../../common/runtime";
import { CordeBotLike, TestReport } from "../../types";
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
export abstract class ExpectTest {
  protected expectation: any;
  protected hasPassed: boolean;

  protected readonly isNot: boolean;
  protected readonly command: string | number | boolean;
  protected readonly cordeBot: CordeBotLike;
  protected readonly timeOut: number;
  /**
   * Initialize the match class with its default values.
   *
   * @param cordeBot The instance of CordeBot initialized by the runtime.
   * @param command The command to execute.
   * @param isNot Definition if this is a deny test.
   */
  constructor(cordeBot: CordeBotLike, command: string | number | boolean, isNot: boolean) {
    this.isNot = isNot;
    this.command = command;
    this.cordeBot = cordeBot;
    this.hasPassed = false;
    this.timeOut = runtime.timeOut;
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

  protected createReport(expect?: string, received?: string): TestReport {
    let message = "";
    if (expect) {
      message = buildReportMessage(expect, received);
    }

    return {
      pass: this.hasPassed,
      message,
    };
  }
}
