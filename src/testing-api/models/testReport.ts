export interface TestReport {
  commandName: string;
  expectation: string;
  output: string;
  testSucessfully: boolean;
  isNot: boolean;
  showExpectAndOutputValue: boolean;
}
