/**
 * Pick some properties of a object
 *
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html#picktk
 * @param obj Object to get its properties
 * @param keys Properties that must be got
 */
export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const copy = {} as Pick<T, K>;
  keys.forEach((key) => (copy[key] = obj[key]));
  return copy;
}
