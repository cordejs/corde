import { ITestProps } from "../../types";

/**
 * @internal
 */
export function toThrowErrorOfType(this: ITestProps, expectedFunction: any, receivedType: any) {
  try {
    expectedFunction();
    return { pass: false, message: "Expected" };
  } catch (err) {
    return err.name === receivedType;
  }
}
