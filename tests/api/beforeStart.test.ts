import { testCollector } from "../../src/common/testColletor";
import { beforeStart } from "../../src/api";

describe("Testing beforeStart function", () => {
  beforeEach(() => {
    testCollector.beforeStartFunctions = [];
  });
  it("Should add a function", () => {
    let a = 1;
    beforeStart(() => {
      a = 2;
    });

    testCollector.beforeStartFunctions.map((fn) => fn());
    expect(a).toBe(2);
  });

  it("Should do nothing", () => {
    beforeStart(undefined);

    const length = testCollector.beforeStartFunctions.length;
    expect(length).toBe(0);
  });
});
