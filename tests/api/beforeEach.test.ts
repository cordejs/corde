import { testCollector } from "../../src/common/testCollector";
import { beforeEach as CordeBeforeEach } from "../../src/api";
import { Queue } from "../../src/utils";

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

    const length = testCollector.beforeEachFunctions.size();
    expect(length).toBe(0);
  });
});
