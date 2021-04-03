import { expect as cordeExpect } from "../../src/expect";
describe("Testing command function", () => {
  it("Should return a MatchesWithNot object", () => {
    const matches = cordeExpect("test");
    expect(matches).not.toBe(undefined);
  });

  it("should get test functions as properties", () => {
    console.log(cordeExpect.not.toReturn(""));
    expect(cordeExpect.not.toReturn("")).toBeTruthy();
  });
});
