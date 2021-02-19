import { reporter } from "../../src/core/reporter";
import { Group, TestReport } from "../../src/types";
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

let group: Group;

describe("testing log class", () => {
  beforeEach(() => {
    group = {
      name: "group name",
      tests: [],
    };
  });

  it("should return false due to no groups to print", () => {
    const response = reporter.outPutResult(null);
    expect(response).toBe(false);
  });

  it("should print group name", () => {
    const spy = jest.spyOn(console, "log");
    reporter.outPutResult([group]);
    expect(getFullConsoleLogWithoutColors(spy.mock.calls)).toContain(group.name);
  });

  it("should print subgroup name", () => {
    group.subGroups = [
      {
        tests: [],
        name: "group name",
      },
    ];
    const spy = jest.spyOn(console, "log");
    reporter.outPutResult([group]);
    const fullLog = getFullConsoleLogWithoutColors(spy.mock.calls);
    const count = fullLog.split(group.name).length - 1;
    expect(count).toEqual(2);
  });

  it("should print test subtest", () => {
    group.tests = [
      {
        name: "test name",
        testsReports: [
          {
            commandName: "commandName",
            expectation: "1",
            isNot: false,
            output: "2",
            showExpectAndOutputValue: true,
            hasPassed: true,
          },
        ],
        testsFunctions: [],
        subTests: [
          {
            name: "test name",
            testsFunctions: [],
          },
        ],
      },
    ];
    const spy = jest.spyOn(console, "log");
    reporter.outPutResult([group]);
    const fullLog = getFullConsoleLogWithoutColors(spy.mock.calls);
    const count = fullLog.split(group.tests[0].name).length - 1;
    expect(count).toEqual(2);
  });

  it("should run print all tests with sucessfully", () => {
    group.tests = [
      {
        name: "test name",
        testsReports: [
          {
            commandName: "commandName",
            expectation: "1",
            isNot: false,
            output: "2",
            showExpectAndOutputValue: true,
            hasPassed: true,
          },
        ],
        testsFunctions: [],
        subTests: [
          {
            name: "test name",
            testsFunctions: [],
          },
        ],
      },
    ];
    const spy = jest.spyOn(console, "log");
    reporter.outPutResult([group]);
    const fullLog = getFullConsoleLogWithoutColors(spy.mock.calls);
    expect(fullLog).toContain("All tests passed!");
  });

  it("should run print all tests with sucessfully", () => {
    const report: TestReport = {
      commandName: "commandName",
      expectation: "1",
      isNot: false,
      output: "2",
      showExpectAndOutputValue: true,
      hasPassed: true,
    };
    const fullConsoleLog = executeOutPutResultAndGetConsoleLogResult(report);
    reporter.outPutResult([group]);
    expect(fullConsoleLog).toContain("All tests passed!");
  });

  it("should run print all tests with patial sucess", () => {
    const report: TestReport = {
      commandName: "commandName",
      expectation: "1",
      isNot: false,
      output: "2",
      showExpectAndOutputValue: true,
      hasPassed: true,
    };

    const report2: TestReport = {
      commandName: "commandName",
      expectation: "1",
      isNot: false,
      output: "2",
      showExpectAndOutputValue: true,
      hasPassed: false,
    };

    const fullConsoleLog = executeOutPutResultAndGetConsoleLogResult(report, report2);
    reporter.outPutResult([group]);
    expect(fullConsoleLog).toContain("Tests passed with errors.");
  });

  it("should printing expect and output values", () => {
    const report: TestReport = {
      commandName: "commandName",
      expectation: "1",
      isNot: false,
      output: "2",
      showExpectAndOutputValue: true,
      hasPassed: true,
    };

    const report2: TestReport = {
      commandName: "commandName",
      expectation: "1",
      isNot: false,
      output: "2",
      showExpectAndOutputValue: true,
      hasPassed: false,
    };

    const fullConsoleLog = executeOutPutResultAndGetConsoleLogResult(report, report2);
    reporter.outPutResult([group]);
    expect(fullConsoleLog).toContain("Tests passed with errors.");
  });

  it("should print fail, showing expectation and output value. And not show 'not' statement", () => {
    const report: TestReport = {
      commandName: "commandName",
      expectation: "1",
      isNot: false,
      output: "2",
      showExpectAndOutputValue: true,
      hasPassed: false,
    };

    const fullConsoleLog = executeOutPutResultAndGetConsoleLogResult(report);
    expect(fullConsoleLog).toContain(
      `FAIL  expected ${report.commandName} to return '${report.expectation}'. Returned: '${report.output}'`,
    );
  });

  it("should print fail, showing expectation and output value. And show 'not' statement", () => {
    const report: TestReport = {
      commandName: "commandName",
      expectation: "1",
      isNot: true,
      output: "1",
      showExpectAndOutputValue: true,
      hasPassed: false,
    };

    const fullConsoleLog = executeOutPutResultAndGetConsoleLogResult(report);
    expect(fullConsoleLog).toContain(
      `FAIL  expected ${report.commandName} to not return '${report.expectation}'. Returned: '${report.output}'`,
    );
  });

  it("should print fail. Without expectation and output value. And not show 'not' statement", () => {
    const report: TestReport = {
      commandName: "commandName",
      expectation: "1",
      isNot: false,
      output: "1",
      showExpectAndOutputValue: false,
      hasPassed: false,
    };

    const fullConsoleLog = executeOutPutResultAndGetConsoleLogResult(report);
    expect(fullConsoleLog).toContain(
      `FAIL  command ${report.commandName} not returned what was expected`,
    );
  });

  it("should print fail, without expectation and output value. And do nothing with 'isNot' statement as true", () => {
    const report: TestReport = {
      commandName: "commandName",
      expectation: "1",
      isNot: true,
      output: "1",
      showExpectAndOutputValue: false,
      hasPassed: false,
    };
    const fullConsoleLog = executeOutPutResultAndGetConsoleLogResult(report);
    expect(fullConsoleLog).toContain(
      `FAIL  command ${report.commandName} not returned what was expected`,
    );
  });
});

function executeOutPutResultAndGetConsoleLogResult(...testReport: TestReport[]) {
  const spy = jest.spyOn(console, "log");
  const groups = createGroupObject(testReport);
  reporter.outPutResult(groups);
  const stringValue = getFullConsoleLog(spy.mock.calls);
  return removeColors(stringValue);
}

function createGroupObject(testReport: TestReport[]) {
  const _group: Group = {
    tests: [
      {
        testsFunctions: [],
        name: "test",
        testsReports: testReport,
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
