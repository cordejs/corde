import { parser } from "../../src/utils/parser";

describe("testing parser", () => {
  it("should parse number to number", () => {
    expect(parser.toNumber(1)).toEqual(1);
  });

  it("should parse string number to number", () => {
    expect(parser.toNumber("1")).toEqual(1);
  });

  it.each(["a", {}, NaN])("should throw error due to %s is not number", (value) => {
    expect(() => parser.toNumber(value)).toThrowError();
  });
});
