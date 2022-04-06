import { ObjectLike } from "../types";

/**
 * Get all property names of a given object and iterate over them.
 *
 * @param obj Object to get his property
 * @param fn Function to be executed in iteration
 *
 * @internal
 */
export function forEachPropsName<T extends ObjectLike>(
  obj: T,
  fn: (key: keyof T, index: number, array: (keyof T)[]) => void,
) {
  const props = Object.getOwnPropertyNames(obj).filter((p) => p !== "__esModule");
  for (let i = 0; i < props.length; i++) {
    fn(props[i], i, props);
  }
}
