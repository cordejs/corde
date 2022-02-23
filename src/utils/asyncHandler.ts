import { isPromise } from "./isPromise";
import { ArgResponse } from "../types";

export async function asyncHandler<T extends (...args: any) => any, U>(
  fn: T,
): Promise<[ArgResponse<T> | undefined, U | undefined]> {
  try {
    const response = fn();

    if (isPromise(response)) {
      return [await (response as Promise<any>), undefined];
    }
    return [response, undefined];
  } catch (error) {
    return [undefined, error];
  }
}
