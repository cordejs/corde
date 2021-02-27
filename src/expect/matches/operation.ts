import { CordeBot } from "../../core";
import { TestReport } from "../../types/types";

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
  protected output: unknown;
  protected expectation: any;
  protected hasPassed: boolean;
  protected message: string;

  protected readonly isNot: boolean;
  protected readonly command: string;
  protected readonly cordeBot: CordeBot;

  /**
   * Initialize the match class with its default values.
   *
   * @param cordeBot The instance of CordeBot initialized by the runtime.
   * @param command The command to execute.
   * @param isNot Definition if this is a deny test.
   */
  public constructor(cordeBot: CordeBot, command: string, isNot: boolean) {
    this.isNot = isNot;
    this.command = command;
    this.cordeBot = cordeBot;
    this.hasPassed = false;
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

  protected catchExecutionError<T extends Error | unknown>(error: T) {
    this.hasPassed = false;
    if (error instanceof Error) {
      this.output = error.message;
    } else {
      this.output = error;
    }
  }

  protected invertHasPassedIfIsNot() {
    if (this.isNot) {
      this.hasPassed = !this.hasPassed;
    }
  }

  protected generateReport(message?: string): TestReport {
    return {
      commandName: this.command,
      expectation: this.expectation,
      output: this.output,
      hasPassed: this.hasPassed,
      isNot: this.isNot,
      message: message ?? this.message,
    };
  }
}
