import { TestLog } from './testLog';

export class Assert {
  private input: string;
  private testName: string;

  constructor(input: string, testName: string) {
    this.input = input;
    this.testName = testName;
  }

  public async shouldReturn(expect: string) {
    const log = new TestLog();
    log.expectation = expect;
    log.input = this.input;
    log.testName = this.testName;
    console.log(log);
  }
}
