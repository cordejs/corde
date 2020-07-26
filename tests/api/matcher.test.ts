import { testCollector } from "../../src/common/testColletor";
import { expectMatchWithNot } from "../../src/api";

// TODO: Improve this tests
describe("Testing describe function", () => {
  beforeEach(() => {
    testCollector.clearIsolatedTestFunctions();
  });

  it("Should not return undefined", () => {
    const matches = expectMatchWithNot("name");
    expect(matches).not.toBe(undefined);
  });

  it("Should not return a function", () => {
    const matches = expectMatchWithNot("name");
    expect(matches.not).not.toBe(undefined);
  });

  it("Should add a function after call toReturn", () => {
    expectMatchWithNot("test").toReturn("empty");
    expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
  });

  it("Should add a function after call toAddReaction", () => {
    expectMatchWithNot("test").toAddReaction("empty");
    expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
  });

  it("Should add toReturn function", () => {
    expectMatchWithNot("test").toReturn("empty");
    const func = testCollector.cloneIsolatedTestFunctions()[0];
    expect(func.toString()).toContain("toReturn");
  });

  it("Should add toAddReaction function", () => {
    expectMatchWithNot("test").toAddReaction("empty");
    const func = testCollector.cloneIsolatedTestFunctions()[0];
    expect(func.toString()).toContain("toAddReaction");
  });
});
