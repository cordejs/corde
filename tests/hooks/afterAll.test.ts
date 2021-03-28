import { testCollector } from "../../src/common";
import { afterAll as _afterAll } from "../../src/hooks";
import { Queue } from "../../src/data-structures";
import { wait } from "../../src/utils";

describe("Testing afterAll function", () => {
  afterEach(() => {
    testCollector.afterAllFunctions = new Queue<() => void>();
  });

  it("Should add a function", () => {
    let a = 1;
    _afterAll(() => {
      a = 2;
    });

    testCollector.afterAllFunctions.executeSync();
    expect(a).toBe(2);
  });

  it("should execute a async function", async () => {
    let a = 0;
    _afterAll(async () => {
      await wait(100);
      a = 1;
    });

    await testCollector.afterAllFunctions.executeWithCatchCollectAsync();
    expect(a).toEqual(1);
  });

  it("Should do nothing", () => {
    _afterAll(undefined);

    const length = testCollector.afterAllFunctions.size;
    expect(length).toBe(0);
  });
});
