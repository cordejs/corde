import { testCollector } from "../../src/common";
import { afterEach } from "../../src/api";

describe("Testing afterEach function", () => {
  beforeEach(() => {
    testCollector.afterEachFunctions = [];
  });

  it("Should add a function", () => {
    let a = 1;
    afterEach(() => {
      a = 2;
    });

    testCollector.afterEachFunctions.map((fn) => fn());
    expect(a).toBe(2);
  });

  it("Should do nothing", () => {
    afterEach(undefined);

    const length = testCollector.afterEachFunctions.length;
    expect(length).toBe(0);
  });
});
