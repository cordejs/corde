import chalk from "chalk";
import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeDate } from "../../../src/expect/matchers";
import { ITestProps } from "../../../src/types";
import { buildReportMessage, typeOf } from "../../../src/utils";
import { removeANSIColorStyle } from "../../testHelper";

function getMessage(expected: any, isNot: boolean) {
  const isNotText = isNot ? " not" : "";
  return buildReportMessage(
    `expected type${isNotText} to be ${chalk.green("Date")}.\n`,
    `received: '${chalk.red(typeOf(expected))}'`,
  );
}

const TEST_CASES = [[null], [1], [undefined], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeDefined", () => {
  it("should return true for a Date value", () => {
    expect(toBeDate({ isNot: false }, new Date())).toEqual({ pass: true, message: "" });
  });

  it("should return true for asymmetricMatcher", () => {
    expect(toBeDate({ isNot: false }, any())).toEqual({ pass: true, message: "" });
    expect(toBeDate({ isNot: false }, any(Date))).toEqual({ pass: true, message: "" });
  });

  it("should return false for asymmetricMatcher of any value that is not Date", () => {
    expect(toBeDate({ isNot: false }, any(Number))).toEqual({
      pass: false,
      message: getMessage(any(Number), false),
    });
  });

  it("should return false for Date with isNot true", () => {
    const props: ITestProps = { isNot: true };
    const response = toBeDate(props, new Date());
    expect(response).toEqual({
      pass: false,
      message: getMessage(new Date(), props.isNot),
    });
    response.message = removeANSIColorStyle(response.message);
    expect(response).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const props: ITestProps = { isNot: false };
    const response = toBeDate(props, expected);
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
      expect(toBeDate(props, expected)).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
