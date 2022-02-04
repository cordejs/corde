import { replaceAll } from "../../src/utils/replaceAll";

describe("testing replace all", () => {
  it("should replace all occurrences", () => {
    expect(replaceAll("example example example", "example", "").trim()).toEqual("");
  });

  it("should replace one occurrence", () => {
    expect(replaceAll("example batata foo", "example", "")).toEqual(" batata foo");
  });

  it("should replace nothing", () => {
    expect(replaceAll("example batata foo", "barbecue", "")).toEqual("example batata foo");
  });
});
