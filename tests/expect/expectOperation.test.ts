import { ExpectTest } from "../../src/expect/matches/expectTest";
import { IExpectTestBaseParams } from "../../src/types";
import { ITestReport } from "../../src/types";
import { testUtils } from "../testHelper";

class TestClass extends ExpectTest {
  constructor(params: IExpectTestBaseParams) {
    super({ ...params, testName: "testClass" });
  }

  action(p1: any, p2: any, p3: any): Promise<ITestReport> {
    return Promise.resolve(super.createReport());
  }
}

function instanceTestClass(commandNane?: string, isNot?: boolean) {
  return testUtils.initTestClass(TestClass, {
    cordeBot: null,
    timeout: 1000,
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
    const reportExpected: ITestReport = {
      pass: false,
      testName: testClass.toString(),
    };
    expect(report).toMatchObject(reportExpected);
  });

  it("should create a valid report based in generic data and isNot false", async () => {
    const conName = "test";
    const testClass = instanceTestClass(conName, false);
    const report = await testClass.action(null, null, null);
    const expectedReport: ITestReport = {
      pass: false,
      testName: testClass.toString(),
    };
    expect(report).toMatchObject(expectedReport);
  });
});
