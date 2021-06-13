import { DeepReadonly, StrictObject } from "../types";
import { isPrimitiveValue } from "./isPrimitiveValue";
import { typeOf } from "./typeOf";

/**
 * Create a new instance of the object with all public properties frozen.
 * public properties: properties that not starts with `_`.
 *
 * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 *
 * @example
 *
 * const obj = {
 *    name: "abc",
 *    age: "aa",
 *    values: [1, 2 ,3]
 * };
 *
 * const frozen = deepFreeze(obj);
 *
 * Object.isFrozen(frozen) // True
 *
 * frozen.name = "aa"; // Error: can not assign value to read-only property
 * frozen.values.push = "aa"; // Error: can not add values to a read-only array
 *
 * @param obj Object to be frozen
 * @returns New frozen instance of the object
 */
export function deepFreeze<T extends StrictObject>(obj: T): DeepReadonly<T> {
  if (isPrimitiveValue(obj) || !obj) {
    return Object.freeze({}) as DeepReadonly<T>;
  }

  const propNames = Object.getOwnPropertyNames(obj).filter((name) => !name.startsWith("_"));
  const freezedObj: any = {};

  for (const propName of propNames) {
    const prop = (obj as any)[propName];

    if (typeOf(prop) === "object") {
      freezedObj[propName] = deepFreeze(prop);
    } else if (Array.isArray(prop)) {
      freezedObj[propName] = Object.freeze(prop.slice());
    } else {
      freezedObj[propName] = prop;
    }
  }

  return Object.freeze<T>(freezedObj) as any as DeepReadonly<T>;
}
