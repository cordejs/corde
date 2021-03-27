import { ExpectTest } from "../../src/expect/matches/expectTest";
import { TestReport } from "../../src/types";

class TestClass extends ExpectTest {
  action(p1: any, p2: any, p3: any): Promise<TestReport> {
    return Promise.resolve(super.createReport());
  }
}

describe("testing ExpectTest class", () => {
  it("should create a valid report based in generic data and isNot true", async () => {
    const conName = "test";
    const testClass = new TestClass(undefined, conName, true);
    const report = await testClass.action(null, null, null);
    const reportExpected: TestReport = {
      pass: false,
    };
    expect(report).toMatchObject(reportExpected);
  });

  it("should create a valid report based in generic data and isNot false", async () => {
    const conName = "test";
    const testClass = new TestClass(undefined, conName, false);
    const report = await testClass.action(null, null, null);
    const expectedReport: TestReport = {
      pass: false,
    };
    expect(report).toMatchObject(expectedReport);
  });
});
