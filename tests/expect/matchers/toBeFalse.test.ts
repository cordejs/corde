import { cordeExpect } from "../../../src/expect";

describe("testing toBeFalse", () => {
  it("should return false for false", () => {
    expect(cordeExpect(false).toBeFalse()).toEqual({ pass: true, message: "" });
  });

  it("should return false for false (isNot true)", () => {
    const result = cordeExpect(false).not.toBeFalse();
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });

  it.each([[true], ["1"], [{}]])("should return false for %s", (value) => {
    const result = cordeExpect(value).toBeFalse();
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });

  it.each([[true], ["1"], [{}]])("should return false for %s", (value) => {
    expect(cordeExpect(value).not.toBeFalse()).toEqual({ pass: true, message: "" });
  });
});
