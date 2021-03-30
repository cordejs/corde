import { testCollector } from "../../src/common/testCollector";
import { Queue } from "../../src/data-structures";
import { afterEach as _afterEach } from "../../src/hooks";
import { wait } from "../../src/utils";

describe("Testing afterEach function", () => {
  afterEach(() => {
    testCollector.afterEachFunctions = new Queue();
  });

  it("Should add a function", () => {
    let a = 1;
    _afterEach(() => {
      a = 2;
    });

    testCollector.afterEachFunctions.executeSync();
    expect(a).toBe(2);
  });

  it("should execute a async function", async () => {
    let a = 0;
    _afterEach(async () => {
      await wait(100);
      a = 1;
    });

    await testCollector.afterEachFunctions.executeWithCatchCollectAsync();
    expect(a).toEqual(1);
  });

  it("Should do nothing", () => {
    _afterEach(undefined);

    const length = testCollector.afterEachFunctions.size;
    expect(length).toBe(0);
  });
});
