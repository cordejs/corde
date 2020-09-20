import { ExpectOperation } from "../../src/api/expectMatches/operation";
import { TestReport } from "../../src/api/interfaces";

class TestClass extends ExpectOperation {
  public action(p1: any, p2: any, p3: any): Promise<TestReport> {
    super.expectation = 1;
    super.output = 1;
    return Promise.resolve(super.generateReport(false));
  }
}

describe("testing ExpectOperation class", () => {
  it("should create a valid report based in generic data and isNot true", async () => {
    const conName = "test";
    const testClass = new TestClass(undefined, conName, true);
    const report = await testClass.action(null, null, null);
    expect(report).toEqual(
      new TestReport({
        commandName: conName,
        expectation: 1,
        output: 1,
        hasPassed: true,
        isNot: true,
        showExpectAndOutputValue: false,
      }),
    );
  });

  it("should create a valid report based in generic data and isNot false", async () => {
    const conName = "test";
    const testClass = new TestClass(undefined, conName, false);
    const report = await testClass.action(null, null, null);
    expect(report).toEqual(
      new TestReport({
        commandName: conName,
        expectation: 1,
        output: 1,
        hasPassed: false,
        isNot: false,
        showExpectAndOutputValue: false,
      }),
    );
  });

  it("should adapt correct values to report after call catchExecutionError", async () => {
    class TestClass1 extends ExpectOperation {
      public action(p1: any, p2: any, p3: any): Promise<TestReport> {
        super.expectation = 1;
        super.output = 1;
        super.catchExecutionError(new Error("test error"));
        return Promise.resolve(super.generateReport(false));
      }
    }

    const conName = "test";
    const testClass = new TestClass1(undefined, conName, false);
    const report = await testClass.action(null, null, null);
    expect(report).toEqual(
      new TestReport({
        commandName: conName,
        expectation: 1,
        output: "test error",
        hasPassed: false,
        isNot: false,
        showExpectAndOutputValue: false,
      }),
    );
  });

  it("should adapt correct values to report after call catchExecutionError", async () => {
    class TestClass1 extends ExpectOperation {
      public action(p1: any, p2: any, p3: any): Promise<TestReport> {
        super.expectation = 1;
        super.output = 1;
        super.catchExecutionError("test error");
        return Promise.resolve(super.generateReport(false));
      }
    }

    const conName = "test";
    const testClass = new TestClass1(undefined, conName, false);
    const report = await testClass.action(null, null, null);
    expect(report).toEqual(
      new TestReport({
        commandName: conName,
        expectation: 1,
        output: "test error",
        hasPassed: false,
        isNot: false,
        showExpectAndOutputValue: false,
      }),
    );
  });
});
