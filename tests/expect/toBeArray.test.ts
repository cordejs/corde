import chalk from "chalk";
import { toBeArray } from "../../src/expect/matchers";
import { any } from "../../src/expect/asymmetricMatcher";
import { ITestProps } from "../../src/types";
import { buildReportMessage, typeOf } from "../../src/utils";
import { removeANSIColorStyle } from "../testHelper";

function getMessage(expected: any, isNot: boolean) {
  const isNotText = isNot ? " not" : "";
  return buildReportMessage(
    `expected type${isNotText} to be an ${chalk.green("array")}.\n`,
    `received: '${chalk.red(typeOf(expected))}'`,
  );
}

const TEST_CASES = [[null], [1], [undefined], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeArray", () => {
  it("should return true for array", () => {
    expect(toBeArray({ isNot: false }, [])).toEqual({ pass: true, message: "" });
  });

  it("should return true for asymmetricMatcher", () => {
    expect(toBeArray({ isNot: false }, any())).toEqual({ pass: true, message: "" });
    expect(toBeArray({ isNot: false }, any(Array))).toEqual({ pass: true, message: "" });
  });

  it("should return false for asymmetricMatcher of any value that is not array", () => {
    expect(toBeArray({ isNot: false }, any(Number))).toEqual({
      pass: false,
      message: getMessage(any(Number), false),
    });
  });

  it("should return false for array with isNot true", () => {
    const props: ITestProps = { isNot: true };
    const response = toBeArray(props, []);
    expect(response).toEqual({
      pass: false,
      message: getMessage([], props.isNot),
    });
    response.message = removeANSIColorStyle(response.message);
    expect(response).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const props: ITestProps = { isNot: false };
    const response = toBeArray(props, expected);
    expect(response).toEqual({
      pass: false,
      message: getMessage(expected, props.isNot),
    });
    response.message = removeANSIColorStyle(response.message);
    expect(response).toMatchSnapshot();
  });

  it.each(TEST_CASES)(
    "should return true for %s, when isNot is true",
    // @ts-ignore
    (expected) => {
      const props: ITestProps = { isNot: true };
      expect(toBeArray(props, expected)).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
