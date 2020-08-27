import { testCollector } from "../../src/common/testColletor";
import { ExpectMatchesWithNot } from "../../src/api";

// TODO: Improve this tests
describe("Testing describe function", () => {
  beforeEach(() => {
    testCollector.clearIsolatedTestFunctions();
  });

  it("Should not return undefined", () => {
    const matches = new ExpectMatchesWithNot("name");
    expect(matches).not.toBe(undefined);
  });

  it("Should not return a function", () => {
    const matches = new ExpectMatchesWithNot("name");
    expect(matches.not).not.toBe(undefined);
  });

  it("Should add a function after call toReturn", () => {
    new ExpectMatchesWithNot("test").toReturn("empty");
    expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
  });

  it("Should add a function after call toAddReaction", () => {
    new ExpectMatchesWithNot("test").toAddReaction("empty");
    expect(testCollector.hasIsolatedTestFunctions()).toBe(true);
  });

  it("Should add toReturn function", () => {
    new ExpectMatchesWithNot("test").toReturn("empty");
    const func = testCollector.cloneIsolatedTestFunctions()[0];
    expect(func.toString()).toContain("toReturn");
  });

  it("Should add toAddReaction function", () => {
    new ExpectMatchesWithNot("test").toAddReaction("empty");
    const func = testCollector.cloneIsolatedTestFunctions()[0];
    expect(func.toString()).toContain("toAddReaction");
  });
});
