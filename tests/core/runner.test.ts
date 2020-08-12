import { executeTestCases } from "../../src/core/runner";
import { Group } from "../../src/interfaces";
import { TestReport } from "../../src/api/interfaces";

const report: TestReport = {
  commandName: "comando",
  expectation: "1",
  isNot: false,
  output: "1",
  showExpectAndOutputValue: false,
  testSucessfully: true,
};

describe("testing executeTestCases", () => {
  it("should execute tests loading its testsReports (without subgroups or subtests)", async () => {
    const groups: Group[] = [
      {
        tests: [
          {
            testsFunctions: [() => Promise.resolve({ ...report })],
          },
        ],
      },
    ];

    await executeTestCases(groups);

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
                testsFunctions: [() => Promise.resolve({ ...report })],
              },
            ],
          },
        ],
        tests: [
          {
            testsFunctions: [() => Promise.resolve({ ...report })],
          },
        ],
      },
    ];

    await executeTestCases(groups);

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
                testsFunctions: [() => Promise.resolve({ ...report })],
              },
            ],
          },
        ],
        tests: [
          {
            testsFunctions: [() => Promise.resolve({ ...report })],
          },
        ],
      },
    ];

    await executeTestCases(groups);

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
                testsFunctions: [() => Promise.resolve({ ...report })],
              },
            ],
          },
        ],
        tests: [
          {
            testsFunctions: [() => Promise.resolve({ ...report })],
            subTests: [
              {
                testsFunctions: [() => Promise.resolve({ ...report })],
              },
            ],
          },
        ],
      },
    ];

    await executeTestCases(groups);

    expect(groups[0].tests[0].testsReports[0]).toEqual(report);
    expect(groups[0].tests[0].testsReports).toHaveLength(1);

    expect(groups[0].subGroups[0].tests[0].testsReports[0]).toEqual(report);
    expect(groups[0].subGroups[0].tests[0].testsReports).toHaveLength(1);

    expect(groups[0].tests[0].subTests[0].testsReports[0]).toEqual(report);
    expect(groups[0].tests[0].subTests[0].testsReports).toHaveLength(1);
  });
});
