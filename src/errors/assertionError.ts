import { TestError } from "./testError";
import { ITestReport } from "../types";

/**
 * Error thrown when a assertion test fail.
 *
 * @example
 *
 * expect(1).toEqual(2);
 *
 * @internal
 */
export class AssertionError extends TestError {
  constructor(report: ITestReport) {
    super(report);
    this._message = "Assertion error. \n" + this.message;
  }
}
