import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeBoolean } from "../../../src/expect/matchers";
import { ITestProps } from "../../../src/types";
import { removeANSIColorStyle } from "../../testHelper";

const TEST_CASES = [[null], [1], [undefined], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeBoolean", () => {
  it("should return true for boolean value", () => {
    expect(toBeBoolean({ isNot: false }, false)).toEqual({ pass: true, message: "" });
  });

  it("should return true for asymmetricMatcher", () => {
    expect(toBeBoolean({ isNot: false }, any())).toEqual({ pass: true, message: "" });
    expect(toBeBoolean({ isNot: false }, any(Boolean))).toEqual({ pass: true, message: "" });
  });

  it("should return false for asymmetricMatcher of any value that is not boolean", () => {
    const response = toBeBoolean({ isNot: false }, any(Number));
    response.message = removeANSIColorStyle(response.message);
    expect(response).toMatchSnapshot();
  });

  it("should return false for boolean with isNot true", () => {
    const props: ITestProps = { isNot: true };
    const response = toBeBoolean(props, false);
    response.message = removeANSIColorStyle(response.message);
    expect(response).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const props: ITestProps = { isNot: false };
    const response = toBeBoolean(props, expected);
    response.message = removeANSIColorStyle(response.message);
    expect(response).toMatchSnapshot();
  });

  it.each(TEST_CASES)(
    "should return true for %s, when isNot is true",
    // @ts-ignore
    (expected) => {
      const props: ITestProps = { isNot: true };
      expect(toBeBoolean(props, expected)).toEqual({
        pass: true,
        message: "",
      });
    },
  );
});
