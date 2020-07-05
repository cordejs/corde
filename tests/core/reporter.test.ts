import { reporter } from '../../src/core/reporter';
import { Group } from '../../src/models';
import { TestReport } from '../../src/testing-api/models';
/**
 * About log.test
 *
 * Tests for that class do not consider colors.
 * The most important for this tests is ensure that the right
 * message is being returned to user. Not it's color.
 *
 * For that, all colors and efects are removed from returned console.log message.
 * and it's validaded only the message itself.
 *
 */

const spy = jest.spyOn(console, 'log');

describe('Testing log class', () => {
  afterEach(() => {
    spy.mockClear();
  });

  it("Should print fail, showing expectation and output value. And not show 'not' statement", () => {
    const report: TestReport = {
      commandName: 'commandName',
      expectation: '1',
      isNot: false,
      output: '2',
      showExpectAndOutputValue: true,
      testSucessfully: false,
    };
    const fullConsoleLog = executeOutPutResultAndGetConsoleLogResult(report);
    expect(fullConsoleLog).toContain(
      `FAIL  expected ${report.commandName} to return '${report.expectation}'. Returned: '${report.output}'`,
    );
  });

  it("Should print fail, showing expectation and output value. And show 'not' statement", () => {
    const report: TestReport = {
      commandName: 'commandName',
      expectation: '1',
      isNot: true,
      output: '1',
      showExpectAndOutputValue: true,
      testSucessfully: false,
    };
    const fullConsoleLog = executeOutPutResultAndGetConsoleLogResult(report);
    expect(fullConsoleLog).toContain(
      `FAIL  expected ${report.commandName} to not return '${report.expectation}'. Returned: '${report.output}'`,
    );
  });

  it("Should print fail. Without expectation and output value. And not show 'not' statement", () => {
    const report: TestReport = {
      commandName: 'commandName',
      expectation: '1',
      isNot: false,
      output: '1',
      showExpectAndOutputValue: false,
      testSucessfully: false,
    };
    const fullConsoleLog = executeOutPutResultAndGetConsoleLogResult(report);
    expect(fullConsoleLog).toContain(
      `FAIL  command ${report.commandName} not returned what was expected`,
    );
  });

  it("Should print fail, without expectation and output value. And do nothing with 'isNot' statement as true", () => {
    const report: TestReport = {
      commandName: 'commandName',
      expectation: '1',
      isNot: true,
      output: '1',
      showExpectAndOutputValue: false,
      testSucessfully: false,
    };
    const fullConsoleLog = executeOutPutResultAndGetConsoleLogResult(report);
    expect(fullConsoleLog).toContain(
      `FAIL  command ${report.commandName} not returned what was expected`,
    );
  });
});

function executeOutPutResultAndGetConsoleLogResult(testReport: TestReport) {
  const groups = createGroupObject(testReport);
  reporter.outPutResult(groups);
  const stringValue = getFullConsoleLog(spy.mock.calls);
  return removeColors(stringValue);
}

function createGroupObject(testReport: TestReport) {
  const group: Group = {
    tests: [
      {
        testsFunctions: [],
        name: 'test',
        testsReports: [testReport],
      },
    ],
  };
  return [group];
}

function removeColors(text: string) {
  return text.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    '',
  );
}

function getFullConsoleLog(log: [any?, ...any[]][]) {
  let stringValue = '';
  for (const value1 of log) {
    for (const value2 of value1) {
      stringValue += `${value2}\n`;
    }
  }
  return stringValue;
}
