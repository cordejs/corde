import { cordeExpect } from "../../../src/expect";

describe("testing toLength", () => {
  it.each([
    ["", 0],
    ["abc", 3],
    [[], 0],
    [[1, 2, 3], 3],
    [cordeExpect.any(), 3],
    ["", cordeExpect.any()],
    ["abc", cordeExpect.any()],
    [[], cordeExpect.any()],
    [[1, 2, 3], cordeExpect.any()],
    ["", cordeExpect.any(Number)],
    ["abc", cordeExpect.any(Number)],
    [[], cordeExpect.any(Number)],
    [[1, 2, 3], cordeExpect.any(Number)],
  ])("should return true for %s's length", (type, length) => {
    expect(cordeExpect(type).toLength(length)).toEqual({ pass: true, message: "" });
  });

  it.each([
    ["", 0],
    ["abc", 3],
    [[], 0],
    [[1, 2, 3], 3],
    [cordeExpect.any(), 3],
    ["", cordeExpect.any()],
    ["abc", cordeExpect.any()],
    [[], cordeExpect.any()],
    [[1, 2, 3], cordeExpect.any()],
    ["", cordeExpect.any(Number)],
    ["abc", cordeExpect.any(Number)],
    [[], cordeExpect.any(Number)],
    [[1, 2, 3], cordeExpect.any(Number)],
  ])("should return false for %s's length (isNot true)", (type, length) => {
    const report = cordeExpect(type).not.toLength(length);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });

  it.each([[1], [{}], [undefined], [null], [Symbol.for("")]])(
    "should return false for invalid expected parameter (%s)",
    (type) => {
      const report = cordeExpect(type).not.toLength(1);
      expect(report.pass).toBeFalsy();
      expect(report.message).toMatchSnapshot();
    },
  );

  it.each([[[]], [""], [{}], [undefined], [null], [Symbol.for("")]])(
    "should return false for invalid length parameter (%s)",
    (length) => {
      const report = cordeExpect([]).not.toLength(length as any);
      expect(report.pass).toBeFalsy();
      expect(report.message).toMatchSnapshot();
    },
  );
});
