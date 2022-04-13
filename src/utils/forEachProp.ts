import { ObjectLike } from "../types";

/**
 * Iterate over a object by each property that it
 * has, excluding `__esModule`.
 *
 * @param obj Object to get his property
 * @param fn Function to be executed in iteration
 *
 * @internal
 * @deprecated use object.foreach instead
 */
export function forEachProp<T extends ObjectLike>(
  obj: T,
  fn: (key: T[keyof T], index: number, array: (keyof T)[]) => void,
) {
  const props = Object.getOwnPropertyNames(obj).filter((p) => p !== "__esModule") as (keyof T)[];
  for (let i = 0; i < props.length; i++) {
    fn(obj[props[i]], i, props);
  }
}
