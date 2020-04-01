import { TestLog } from './testLog';

export class Assert {
  private commandName: string;
  private testName: string;

  constructor(input: string, testName: string) {
    this.commandName = input;
    this.testName = testName;
  }

  public shouldReturn(expect: string) {
    const log = new TestLog();
    log.expectation = expect;
    log.commandName = this.commandName;
    log.testName = this.testName;
    process.stdout.write(JSON.stringify(log));
  }
}
