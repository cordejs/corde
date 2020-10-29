import { testCollector } from "../../src/common";
import { afterEach } from "../../src/api";
import { Queue } from "../../src/utils";

describe("Testing afterEach function", () => {
  afterEach(() => {
    testCollector.afterEachFunctions = new Queue();
  });

  it("Should add a function", () => {
    let a = 1;
    afterEach(() => {
      a = 2;
    });

    testCollector.afterEachFunctions.executeSync();
    expect(a).toBe(2);
  });

  it("Should do nothing", () => {
    afterEach(undefined);

    const length = testCollector.afterEachFunctions.size();
    expect(length).toBe(0);
  });
});
