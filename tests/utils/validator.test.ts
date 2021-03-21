import { Validator } from "../../src/utils";

describe("testing validator", () => {
  it("validation should pass", () => {
    const validator = new Validator<[number]>();
    validator.add((num) => num > 0);
    expect(validator.isValid(1)).toBeTruthy();
  });

  it("validation should pass with double parameters", () => {
    const validator = new Validator<[number, string]>();
    validator.add((num, stri) => num > 0 && stri === "test");
    validator.add((num, _) => num === 1);
    expect(validator.isValid(1, "test")).toBeTruthy();
  });

  it("validation should fail", () => {
    const validator = new Validator<[number]>();
    validator.add((num) => num > 0);
    validator.add((num) => num < 1);
    expect(validator.isValid(1)).toBeFalsy();
  });

  it("validation should pass with no validator added", () => {
    const validator = new Validator<[number]>();
    expect(validator.isValid(1)).toBeTruthy();
  });
});
