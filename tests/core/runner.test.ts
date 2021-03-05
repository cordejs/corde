import { testRunner } from "../../src/core/runner";
import { Group, TestFile, TestReport } from "../../src/types";
import { getFullConsoleLog } from "../testHelper";

const report: TestReport = {
  commandName: "comando",
  expectation: "1",
  isNot: false,
  output: "1",
  hasPassed: true,
};

describe("testing executeTestCases", () => {
  it("should execute tests loading its testsReports (without subgroups or subtests)", async () => {
    const groups: Group[] = [
      {
        tests: [
          {
            testsFunctions: [() => Promise.resolve(report)],
          },
        ],
      },
    ];

    await testRunner.executeTestCases(groups);

    expect(groups[0].tests[0].testsReports[0]).toEqual(report);
    expect(groups[0].tests[0].testsReports).toHaveLength(1);
  });

  it("should execute tests loading its testsReports (with subgroups but without subtests)", async () => {
    const groups: Group[] = [
      {
        subGroups: [
          {
            tests: [
              {
                testsFunctions: [() => Promise.resolve(report)],
              },
            ],
          },
        ],
        tests: [
          {
            testsFunctions: [() => Promise.resolve(report)],
          },
        ],
      },
    ];

    await testRunner.executeTestCases(groups);

    expect(groups[0].tests[0].testsReports[0]).toEqual(report);
    expect(groups[0].tests[0].testsReports).toHaveLength(1);

    expect(groups[0].subGroups[0].tests[0].testsReports[0]).toEqual(report);
    expect(groups[0].subGroups[0].tests[0].testsReports).toHaveLength(1);
  });

  it("should execute tests loading its testsReports (with subgroups but without subtests)", async () => {
    const groups: Group[] = [
      {
        subGroups: [
          {
            tests: [
              {
                testsFunctions: [() => Promise.resolve(report)],
              },
            ],
          },
        ],
        tests: [
          {
            testsFunctions: [() => Promise.resolve(report)],
          },
        ],
      },
    ];

    await testRunner.executeTestCases(groups);

    expect(groups[0].tests[0].testsReports[0]).toEqual(report);
    expect(groups[0].tests[0].testsReports).toHaveLength(1);

    expect(groups[0].subGroups[0].tests[0].testsReports[0]).toEqual(report);
    expect(groups[0].subGroups[0].tests[0].testsReports).toHaveLength(1);
  });

  it("should execute tests loading its testsReports (with subgroups and subtests)", async () => {
    const groups: Group[] = [
      {
        subGroups: [
          {
            tests: [
              {
                testsFunctions: [() => Promise.resolve(report)],
              },
            ],
          },
        ],
        tests: [
          {
            testsFunctions: [() => Promise.resolve(report)],
            subTests: [
              {
                testsFunctions: [() => Promise.resolve(report)],
              },
            ],
          },
        ],
      },
    ];

    await testRunner.executeTestCases(groups);

    expect(groups[0].tests[0].testsReports[0]).toEqual(report);
    expect(groups[0].tests[0].testsReports).toHaveLength(1);

    expect(groups[0].subGroups[0].tests[0].testsReports[0]).toEqual(report);
    expect(groups[0].subGroups[0].tests[0].testsReports).toHaveLength(1);

    expect(groups[0].tests[0].subTests[0].testsReports[0]).toEqual(report);
    expect(groups[0].tests[0].subTests[0].testsReports).toHaveLength(1);
  });

  it("should return empty array when has no groups", async () => {
    const groups: Group[] = null;
    await testRunner.executeTestCases(groups);
    expect(groups).toBeFalsy();
  });

  it("should return empty array when has groups with empty tests", async () => {
    const groups: Group[] = [
      {
        tests: null,
      },
    ];
    await testRunner.executeTestCases(groups);
    expect(groups[0].tests).toBeFalsy();
  });

  it("should print a passed test on console", async () => {
    const test: TestFile[] = [
      {
        path: "/tests/file.test.ts",
        isEmpty: false,
        groups: [
          {
            name: "group",
            tests: [
              {
                name: "test case",
                testsFunctions: [
                  () =>
                    Promise.resolve<TestReport>({
                      hasPassed: true,
                      commandName: "con",
                      expectation: "1",
                      output: "2",
                      message: "",
                      isNot: false,
                    }),
                ],
              },
            ],
          },
        ],
      },
    ];

    const spy = jest.spyOn(console, "log");
    await testRunner.runTestsAndPrint(test);

    expect(getFullConsoleLog(spy.mock.calls)).toContain("test case");
  });
});
