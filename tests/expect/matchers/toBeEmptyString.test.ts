import { cordeExpect } from "../../../src/expect";

describe("testing toBeEmptyString", () => {
  it("should return true for asymmetricMatcher", () => {
    expect(cordeExpect(cordeExpect.any()).toBeEmptyString()).toEqual({ pass: true, message: "" });
    expect(cordeExpect(cordeExpect.any(String)).toBeEmptyString()).toEqual({
      pass: true,
      message: "",
    });
  });

  it("should return true for empty string", () => {
    expect(cordeExpect("").toBeEmptyString()).toEqual({ pass: true, message: "" });
  });

  it("should return false for empty string when isNot true", () => {
    const report = cordeExpect("").not.toBeEmptyString();
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });

  it.each([[[""]], ["4141"], [1]])("should return false for %s", (value) => {
    const report = cordeExpect(value).toBeEmptyString();
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });
});
