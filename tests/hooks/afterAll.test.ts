import { testCollector } from "../../src/common";
import { afterAll } from "../../src/hooks";
import { Queue } from "../../src/data-structures";

describe("Testing afterAll function", () => {
  afterEach(() => {
    testCollector.afterAllFunctions = new Queue<() => void>();
  });

  it("Should add a function", () => {
    let a = 1;
    afterAll(() => {
      a = 2;
    });

    testCollector.afterAllFunctions.executeSync();
    expect(a).toBe(2);
  });

  it("Should do nothing", () => {
    afterAll(undefined);

    const length = testCollector.afterAllFunctions.size;
    expect(length).toBe(0);
  });
});
