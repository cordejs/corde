import { testCollector } from "../../src/common/testCollector";
import { beforeEach as CordeBeforeEach } from "../../src/api";

describe("Testing beforeEach function", () => {
  beforeEach(() => {
    testCollector.beforeEachFunctions = [];
  });
  it("Should add a function", () => {
    let a = 1;
    CordeBeforeEach(() => {
      a = 2;
    });

    testCollector.beforeEachFunctions.map((fn) => fn());
    expect(a).toBe(2);
  });

  it("Should do nothing", () => {
    CordeBeforeEach(undefined);

    const length = testCollector.beforeEachFunctions.length;
    expect(length).toBe(0);
  });
});
