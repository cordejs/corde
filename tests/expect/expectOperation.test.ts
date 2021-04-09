import { runtime } from "../../src/common/runtime";
import { ExpectTest } from "../../src/expect/matches/expectTest";
import { ExpectTestBaseParams } from "../../src/expect/types";
import { TestReport } from "../../src/types";
import { testUtils } from "../testHelper";

class TestClass extends ExpectTest {
  constructor(params: ExpectTestBaseParams) {
    super({ ...params, testName: "testClass" });
  }

  action(p1: any, p2: any, p3: any): Promise<TestReport> {
    return Promise.resolve(super.createReport());
  }
}

function instanceTestClass(commandNane?: string, isNot?: boolean) {
  return testUtils.initTestClass(TestClass, {
    command: commandNane,
    isNot: isNot,
    isCascade: false,
  });
}

describe("testing ExpectTest class", () => {
  it("should create a valid report based in generic data and isNot true", async () => {
    const conName = "test";
    const testClass = instanceTestClass(conName, true);
    const report = await testClass.action(null, null, null);
    const reportExpected: TestReport = {
      pass: false,
      testName: testClass.toString(),
    };
    expect(report).toMatchObject(reportExpected);
  });

  it("should create a valid report based in generic data and isNot false", async () => {
    const conName = "test";
    const testClass = instanceTestClass(conName, false);
    const report = await testClass.action(null, null, null);
    const expectedReport: TestReport = {
      pass: false,
      testName: testClass.toString(),
    };
    expect(report).toMatchObject(expectedReport);
  });
});
