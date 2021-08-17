import { any } from "../../../src/expect/asymmetricMatcher";
import { toBeDefined } from "../../../src/expect/matchers";
import { ITestProps } from "../../../src/types";
import { removeANSIColorStyle } from "../../testHelper";

const TEST_CASES = [[1], ["aa"], [{}], [Symbol.for("")]];

describe("testing toBeDefined", () => {
  it.each([[1], [true], [false], ["aa"], [{}], [new Date()], [Symbol.for("")]])(
    "should return true for a defined value (%s)",
    (value) => {
      expect(toBeDefined({ isNot: false }, value)).toEqual({ pass: true, message: "" });
    },
  );

  it("should return true for asymmetricMatcher", () => {
    expect(toBeDefined({ isNot: false }, any())).toEqual({ pass: true, message: "" });
  });

  it("should return false for undefined", () => {
    const response = toBeDefined({ isNot: false }, null);
    response.message = removeANSIColorStyle(response.message);
    expect(response).toMatchSnapshot();
  });

  it("should return false for null", () => {
    const response = toBeDefined({ isNot: false }, null);
    response.message = removeANSIColorStyle(response.message);
    expect(response).toMatchSnapshot();
  });

  it("should return false for boolean with isNot true", () => {
    const props: ITestProps = { isNot: true };
    const response = toBeDefined(props, new Date());
    response.message = removeANSIColorStyle(response.message);
    expect(response).toMatchSnapshot();
  });

  // @ts-ignore
  it.each(TEST_CASES)("should return true for %s", (expected) => {
    const props: ITestProps = { isNot: false };
    const response = toBeDefined(props, expected);
    response.message = removeANSIColorStyle(response.message);
    expect(response).toMatchSnapshot();
  });
});
