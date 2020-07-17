import { command } from "../../src/api";
describe("Testing command function", () => {
  it("Should return a MatchesWithNot object", () => {
    const matches = expect("test");
    expect(matches).not.toBe(undefined);
  });
});
