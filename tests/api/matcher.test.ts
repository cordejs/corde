import { testCollector } from "../../src/common/testColletor";
import { matcherWithNotFn } from "../../src/api";

// TODO: Improve this tests
describe("Testing describe function", () => {
  beforeEach(() => {
    testCollector.cleanTestFunctions();
  });

  it("Should not return undefined", () => {
    const matches = matcherWithNotFn("name");
    expect(matches).not.toBe(undefined);
  });

  it("Should not return a function", () => {
    const matches = matcherWithNotFn("name");
    expect(matches.not).not.toBe(undefined);
  });

  it("Should add a function after call toReturn", () => {
    matcherWithNotFn("test").toReturn("empty");
    expect(testCollector.hasTestFunctions()).toBe(true);
  });

  it("Should add a function after call toAddReaction", () => {
    matcherWithNotFn("test").toAddReaction("empty");
    expect(testCollector.hasTestFunctions()).toBe(true);
  });

  it("Should add toReturn function", () => {
    matcherWithNotFn("test").toReturn("empty");
    const func = testCollector.cloneTestFunctions()[0];
    expect(func.toString()).toContain("run");
  });

  it("Should add toAddReaction function", () => {
    matcherWithNotFn("test").toAddReaction("empty");
    const func = testCollector.cloneTestFunctions()[0];
    expect(func.toString()).toContain("run");
  });
});
