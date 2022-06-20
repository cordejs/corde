import { cordeExpect } from "../../../src/expect";

describe("testing toBeTrue", () => {
  it("should return true for true", () => {
    expect(cordeExpect(true).toBeTrue()).toEqual({ pass: true, message: "" });
  });

  it("should return true for true (isNot true)", () => {
    const result = cordeExpect(true).not.toBeTrue();
    expect(result.pass).toBeFalsy();
    expect(result.message).toMatchSnapshot();
  });

  it.each([[false], ["1"], [{}]])("should return false for %s", (value) => {
    const result = cordeExpect(value).toBeTrue();
    expect(result.pass).toBeFalsy();
    // eslint-disable-next-line no-console
    console.log(result.message);
    expect(result.message).toMatchSnapshot();
  });

  it.each([[false], ["1"], [{}]])("should return false for %s", (value) => {
    expect(cordeExpect(value).not.toBeTrue()).toEqual({ pass: true, message: "" });
  });
});
