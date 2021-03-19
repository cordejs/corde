import { TestReport } from "../../src/types";
import { getStackTrace } from "../../src/utils";

type TypeExecutor = () => Promise<TestReport>;
let executorList: TypeExecutor[] = [];

class ExpectExample {
  toReturn() {
    const trace = getStackTrace();
    executorList.push(() => {
      return Promise.resolve<TestReport>({
        pass: false,
        message: "error",
      }).then((r) => {
        r.trace = trace;
        return r;
      });
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
    expect(report).toMatchSnapshot();
  });
});
