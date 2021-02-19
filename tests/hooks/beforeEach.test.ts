import { testCollector } from "../../src/common/testCollector";
import { Queue } from "../../src/data-structures";
import { beforeEach as CordeBeforeEach } from "../../src/hooks";

describe("Testing beforeEach function", () => {
  afterEach(() => {
    testCollector.beforeEachFunctions = new Queue();
  });
  it("Should add a function", () => {
    let a = 1;
    CordeBeforeEach(() => {
      a = 2;
    });

    testCollector.beforeEachFunctions.executeSync();
    expect(a).toBe(2);
  });

  it("Should do nothing", () => {
    CordeBeforeEach(undefined);

    const length = testCollector.beforeEachFunctions.size;
    expect(length).toBe(0);
  });
});
