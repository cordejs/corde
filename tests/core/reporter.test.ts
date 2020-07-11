import { reporter } from "../../src/core/reporter";
import { Group } from "../../src/interfaces";
import { TestReport } from "../../src/api/interfaces";
import { getFullConsoleLog } from "../testHelper";
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

const spy = jest.spyOn(console, "log");

let group: Group;

describe("Testing log class", () => {
  afterEach(() => {
    spy.mockClear();
  });

  beforeEach(() => {
    group = {
      name: "group name",
      tests: [],
    };
  });

  it("Should return false due to no groups to print", () => {
    const response = reporter.outPutResult(null);
    expect(response).toBe(false);
  });

  it("Should print group name", () => {
    reporter.outPutResult([group]);
    expect(getFullConsoleLogWithoutColors(spy.mock.calls)).toContain(group.name);
  });

  it("Should print subgroup name", () => {
    group.subGroups = [
      {
        tests: [],
        name: "group name",
      },
    ];
    reporter.outPutResult([group]);
    const fullLog = getFullConsoleLogWithoutColors(spy.mock.calls);
    const count = fullLog.split(group.name).length - 1;
    expect(count).toEqual(2);
  });

  it("Should print fail, showing expectation and output value. And not show 'not' statement", () => {
    const report: TestReport = {
      commandName: "commandName",
      expectation: "1",
      isNot: false,
      output: "2",
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
      commandName: "commandName",
      expectation: "1",
      isNot: true,
      output: "1",
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
      commandName: "commandName",
      expectation: "1",
      isNot: false,
      output: "1",
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
      commandName: "commandName",
      expectation: "1",
      isNot: true,
      output: "1",
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
  const _group: Group = {
    tests: [
      {
        testsFunctions: [],
        name: "test",
        testsReports: [testReport],
      },
    ],
  };
  return [_group];
}

function getFullConsoleLogWithoutColors(log: [any?, ...any[]][]) {
  const response = getFullConsoleLog(log);
  return removeColors(response);
}

function removeColors(text: string) {
  return text.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
}
