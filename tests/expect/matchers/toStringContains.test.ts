import { cordeExpect } from "../../../src/expect";

const toPassCases = [
  ["11", "1"],
  ["", ""],
  [cordeExpect.any(String), cordeExpect.any()],
  [cordeExpect.any(String), ""],
  [cordeExpect.any(), ""],
  ["", cordeExpect.any()],
  ["", cordeExpect.any(String)],
  [cordeExpect.any(), cordeExpect.any(String)],
  [cordeExpect.any(String), cordeExpect.any(String)],
];

const toFailCases = [
  [1, 1],
  [cordeExpect.any(Number), 1],
  [cordeExpect.any(), 1],
  ["foo bar", "baa"],
];

describe("testing toStringContains", () => {
  it.each(toPassCases)("should return true for %s and %s", (expected, received) => {
    expect(cordeExpect(expected).toStringContains(received)).toEqual({ pass: true, message: "" });
  });

  it.each(toPassCases)("should return false for %s and %s (isNot true)", (expected, received) => {
    const report = cordeExpect(expected).not.toStringContains(received);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });

  it.each(toFailCases)("should return false for %s and %s", (expected, received) => {
    const report = cordeExpect(expected).toStringContains(received);
    expect(report.pass).toBeFalsy();
    expect(report.message).toMatchSnapshot();
  });
});
