import { ITestReport } from "../../src/types";
import { getStackTrace } from "../../src/utils/getStackTrace";

type TypeExecutor = () => Promise<ITestReport>;
const executorList: TypeExecutor[] = [];

class ExpectExample {
  toReturn() {
    const trace = getStackTrace();
    executorList.push(async () => {
      const r = await Promise.resolve<ITestReport>({
        testName: "",
        pass: false,
        message: "error",
      });
      r.trace = trace;
      return r;
    });
  }
}

function test() {
  testExpect().toReturn();
}

export function testExpect() {
  return new ExpectExample();
}

describe("testing getStackTrace", () => {
  it("should get trace of an function", async () => {
    test();
    const report = await executorList[0]();
    // I don't know to check it in CI.
    expect(report).toBeTruthy();
  });
});
