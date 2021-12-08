import { ITestProps } from "../../types";

/**
 * @internal
 */
export function toThrowError(this: ITestProps, expectedFunction: any) {
  try {
    expectedFunction();
    return { pass: false, message: "Expected" };
  } catch (err) {
    return { pass: true };
  }
}
