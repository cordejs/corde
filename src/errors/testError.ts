import { ITestReport } from "../types";

export class TestError extends Error {
  protected _pass: boolean;
  protected _message: string;
  protected _trace?: string;
  protected _testName?: string;

  get message() {
    return this._message;
  }
  get trace() {
    return this._trace;
  }
  get pass() {
    return this._pass;
  }
  get testName() {
    return this._testName;
  }

  constructor({ pass, testName, trace, message }: ITestReport) {
    super();
    this._pass = pass;
    this._message = message ?? "Test Failed";
    this._trace = trace;
    this._testName = testName;
  }
}
