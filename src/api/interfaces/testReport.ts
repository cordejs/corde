export interface TestReportModel {
  commandName: string;
  expectation: any;
  output: any;
  isNot: boolean;
  hasPassed: boolean;
  showExpectAndOutputValue: boolean;
  customReturnMessage?: string;
}

export class TestReport implements TestReport {
  public readonly commandName: string;
  public readonly expectation: any;
  public readonly output: any;
  public readonly isNot: boolean;
  public readonly showExpectAndOutputValue: boolean;
  public readonly customReturnMessage?: string;
  public readonly hasPassed: boolean;

  constructor(model: TestReportModel) {
    this.commandName = model.commandName;
    this.expectation = model.expectation;
    this.output = model.output;
    this.isNot = model.isNot;
    this.showExpectAndOutputValue = model.showExpectAndOutputValue;
    this.customReturnMessage = model.customReturnMessage;
    this.hasPassed = model.hasPassed;
  }
}
