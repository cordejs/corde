import { testCollector } from "../../src/common/testCollector";
import { beforeStart } from "../../src/api";
import { Queue } from "../../src/utils";

describe("Testing beforeStart function", () => {
  afterEach(() => {
    testCollector.beforeStartFunctions = new Queue();
  });
  it("Should add a function", () => {
    let a = 1;
    beforeStart(() => {
      a = 2;
    });

    testCollector.beforeStartFunctions.executeSync();
    expect(a).toBe(2);
  });

  it("Should do nothing", () => {
    beforeStart(undefined);

    const length = testCollector.beforeStartFunctions.size();
    expect(length).toBe(0);
  });
});
