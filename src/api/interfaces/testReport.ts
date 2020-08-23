import { messageExpectationType } from "../../types";

interface TestReportModel {
  readonly commandName: string;
  readonly expectation: messageExpectationType;
  readonly output: string;
  readonly isNot: boolean;
  readonly testSucessfully?: boolean;
  readonly showExpectAndOutputValue: boolean;
  readonly customReturnMessage?: string;
}

export class TestReport implements TestReport {
  public readonly commandName: string;
  public readonly expectation: messageExpectationType;
  public readonly output: string;
  public readonly isNot: boolean;
  public readonly showExpectAndOutputValue: boolean;
  public readonly customReturnMessage?: string;

  private _testSucessfully?: boolean;

  constructor(model: TestReportModel) {
    this.commandName = model.commandName;
    this.expectation = model.expectation;
    this.output = model.output;
    this.isNot = model.isNot;
    this.showExpectAndOutputValue = model.showExpectAndOutputValue;
    this.customReturnMessage = model.customReturnMessage;
    this._testSucessfully = model.testSucessfully;
  }

  public hasPassed() {
    if (!!this._testSucessfully) {
      return this._testSucessfully;
    }

    if (this.isNot) {
      return this.expectation !== this.output;
    }
    return this.expectation === this.output;
  }
}
