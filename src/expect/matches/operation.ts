import { runtime } from "../../common";
import { CordeBot } from "../../core";
import { TestReport } from "../../types/types";
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
export abstract class ExpectOperation<P1 = any, P2 = any, P3 = any> {
  protected expectation: any;
  protected hasPassed: boolean;

  protected readonly isNot: boolean;
  protected readonly command: string | number | boolean;
  protected readonly cordeBot: CordeBot;
  protected readonly timeOut: number;
  /**
   * Initialize the match class with its default values.
   *
   * @param cordeBot The instance of CordeBot initialized by the runtime.
   * @param command The command to execute.
   * @param isNot Definition if this is a deny test.
   */
  public constructor(cordeBot: CordeBot, command: string | number | boolean, isNot: boolean) {
    this.isNot = isNot;
    this.command = command;
    this.cordeBot = cordeBot;
    this.hasPassed = false;
    this.timeOut = runtime.timeOut;
  }

  /**
   * Execute the test, checking if a command did what was proposed to do.
   *
   * @param p1 First parameter of the test.
   * @param p2 Second parameter of the test.
   * @param p3 Thirty parameter of the test.
   *
   * @returns A report of the executed command.
   */
  public abstract action(p1: P1, p2: P2, p3: P3): Promise<TestReport>;

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
      message: message,
    };
  }
}
