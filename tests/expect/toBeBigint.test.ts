import chalk from "chalk";
import { toBeBigint } from "../../src/expect/matchers";
import { ITestProps } from "../../src/types";
import { buildReportMessage, typeOf } from "../../src/utils";
import { removeANSIColorStyle } from "../testHelper";

function getMessage(expected: any, isNot: boolean) {
  const isNotText = isNot ? " not" : "";
  return buildReportMessage(
    `expected type${isNotText} to be ${chalk.green("bigint")}.\n`,
    `received: '${chalk.red(typeOf(expected))}'`,
  );
}

const TEST_CASES = [[null], [1], [undefined], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeBigint", () => {
  it("should return true for bigint value", () => {
    expect(toBeBigint({ isNot: false }, 9007199254740991n)).toEqual({ pass: true, message: "" });
  });

  it("should return false for array with isNot true", () => {
    const props: ITestProps = { isNot: true };
    const response = toBeBigint(props, 9007199254740991n);
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
    const response = toBeBigint(props, expected);
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
      expect(toBeBigint(props, expected)).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
