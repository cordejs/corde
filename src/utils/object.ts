import { ObjectLike } from "../types";

export namespace object {
  export function find<T>(
    obj: T,
    fn: (key: T[keyof T], index: number, array: (keyof T)[]) => boolean,
  ) {
    const props = getObjectKeys(obj);
    for (let i = 0; i < props.length; i++) {
      const current = obj[props[i]];
      if (fn(current, i, props)) {
        return current;
      }
    }
    return undefined;
  }

  /**
   * Iterate over a object by each property that it
   * has, excluding `__esModule`.
   *
   * @param obj Object to get his property
   * @param fn Function to be executed in iteration
   *
   * @internal
   */
  export function foreach<T extends ObjectLike>(
    obj: T,
    fn: (key: T[keyof T], index: number, array: (keyof T)[]) => void,
  ) {
    const props = getObjectKeys(obj);
    for (let i = 0; i < props.length; i++) {
      fn(obj[props[i]], i, props);
    }
  }

  /**
   * Get all property names of a given object and iterate over them.
   *
   * @param obj Object to get his property
   * @param fn Function to be executed in iteration
   *
   * @internal
   */
  export function foreachKey<T extends ObjectLike>(
    obj: T,
    fn: (key: keyof T, index: number, array: (keyof T)[]) => void,
  ) {
    const props = getObjectKeys(obj);
    for (let i = 0; i < props.length; i++) {
      fn(props[i], i, props);
    }
  }

  function getObjectKeys<T>(obj: T) {
    return Object.getOwnPropertyNames(obj).filter((p) => p !== "__esModule") as (keyof T)[];
  }
}
