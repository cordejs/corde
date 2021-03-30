import { testCollector } from "../../src/common/testCollector";
import { beforeStart as _beforeStart } from "../../src/hooks";
import { Queue } from "../../src/data-structures";
import { wait } from "../../src/utils";

describe("Testing beforeStart function", () => {
  afterEach(() => {
    testCollector.beforeStartFunctions = new Queue();
  });
  it("Should add a function", () => {
    let a = 1;
    _beforeStart(() => {
      a = 2;
    });

    testCollector.beforeStartFunctions.executeSync();
    expect(a).toBe(2);
  });

  it("Should do nothing", () => {
    _beforeStart(undefined);

    const length = testCollector.beforeStartFunctions.size;
    expect(length).toBe(0);
  });

  it("add a async function", async () => {
    let a = 1;
    _beforeStart(async () => {
      await wait(100);
      a = 2;
    });

    await testCollector.beforeStartFunctions.executeAsync();
    expect(a).toBe(2);
  });
});
