import { testCollector } from "../../src/common/testCollector";
import { Queue } from "../../src/data-structures";
import { beforeEach as _beforeEach } from "../../src/hooks";
import { wait } from "../../src/utils";

describe("Testing beforeEach function", () => {
  afterEach(() => {
    testCollector.beforeEachFunctions = new Queue();
  });
  it("Should add a function", () => {
    let a = 1;
    _beforeEach(() => {
      a = 2;
    });

    testCollector.beforeEachFunctions.executeSync();
    expect(a).toBe(2);
  });

  it("should execute a async function", async () => {
    let a = 0;
    _beforeEach(async () => {
      await wait(100);
      a = 1;
    });

    await testCollector.beforeEachFunctions.executeWithCatchCollectAsync();
    expect(a).toEqual(1);
  });

  it("Should do nothing", () => {
    _beforeEach(undefined);

    const length = testCollector.beforeEachFunctions.size;
    expect(length).toBe(0);
  });
});
