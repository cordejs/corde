import { TestError } from ".";
import { ITestReport } from "../types";

/**
 * Error thrown when a command test fail
 *
 * @example
 *
 * con("ping").shouldReturn("pong");
 *
 * @internal
 */
export class CommandTestError extends TestError {
  constructor(report: ITestReport) {
    super(report);
    this._message = "Command test error. \n" + this.message;
  }
}
