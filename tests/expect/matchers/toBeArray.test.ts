import { toBeArray } from "../../../src/expect/matchers";
import { any } from "../../../src/expect/asymmetricMatcher";
import { ITestProps } from "../../../src/types";
import { removeANSIColorStyle } from "../../testHelper";

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
    const response = toBeArray({ isNot: false }, any(Number));
    response.message = removeANSIColorStyle(response.message);
    expect(response).toMatchSnapshot();
  });

  it("should return false for array with isNot true", () => {
    const props: ITestProps = { isNot: true };
    const response = toBeArray(props, []);
    response.message = removeANSIColorStyle(response.message);
    expect(response).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return false for %s", (expected) => {
    const props: ITestProps = { isNot: false };
    const response = toBeArray(props, expected);
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
