import { messageExpectationType } from "../../types";

interface TestReportModel {
  commandName: string;
  expectation: messageExpectationType;
  output: string;
  isNot: boolean;
  isEqual?: boolean;
  showExpectAndOutputValue: boolean;
  customReturnMessage?: string;
}

export class TestReport {
  public commandName: string;
  public expectation: messageExpectationType;
  public output: string;
  public isNot: boolean;
  public showExpectAndOutputValue: boolean;
  public customReturnMessage?: string;

  private _isEqual: boolean;

  constructor(model: TestReportModel) {
    this.commandName = model.commandName;
    this.expectation = model.expectation;
    this.output = model.output;
    this.isNot = model.isNot;
    this.showExpectAndOutputValue = model.showExpectAndOutputValue;
    this.customReturnMessage = model.customReturnMessage;
  }

  public hasPassed() {
    if (this._isEqual) {
      return this._isEqual;
    }

    if (this.isNot) {
      return this.expectation !== this.output;
    }
    return this.expectation === this.output;
  }
}
