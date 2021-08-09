import { isPrimitiveValue, typeOf } from "../../utils";

/**
 * @internal
 */
export function toBePrimitive<T>(expected: T) {
  const pass = isPrimitiveValue(expected);
  return {
    pass,
    message: pass ? "" : `expected: ${expected} to be primitive.\nreceived: '${typeOf(expected)}'`,
  };
}
