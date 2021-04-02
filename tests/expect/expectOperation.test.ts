import { runtime } from "../../src/common/runtime";
import { ExpectTest } from "../../src/expect/matches/expectTest";
import { TestReport } from "../../src/types";

class TestClass extends ExpectTest {
  action(p1: any, p2: any, p3: any): Promise<TestReport> {
    return Promise.resolve(super.createReport());
  }
}

function instanceTestClass(commandNane?: string, isNot?: boolean) {
  return new TestClass({
    command: commandNane ?? "",
    isNot: isNot ?? false,
    cordeBot: null,
    timeout: runtime.timeOut,
  });
}

describe("testing ExpectTest class", () => {
  it("should create a valid report based in generic data and isNot true", async () => {
    const conName = "test";
    const testClass = instanceTestClass(conName, true);
    const report = await testClass.action(null, null, null);
    const reportExpected: TestReport = {
      pass: false,
    };
    expect(report).toMatchObject(reportExpected);
  });

  it("should create a valid report based in generic data and isNot false", async () => {
    const conName = "test";
    const testClass = instanceTestClass(conName, false);
    const report = await testClass.action(null, null, null);
    const expectedReport: TestReport = {
      pass: false,
    };
    expect(report).toMatchObject(expectedReport);
  });
});
