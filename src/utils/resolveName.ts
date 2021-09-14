import { isFunction } from ".";
import { typeOf } from "./typeOf";

/**
 * Resolves an name executing or converting it's value.
 * it's a safe function, so if any error occour, the function
 * will return an empty string.
 *
 * @param name Name like value.
 * @returns resolved name.
 * @internal
 */
export async function resolveName(name: any): Promise<string | number | boolean> {
  try {
    let resolvedName = name;

    // In case of trying to put functions inside functions
    while (isFunction(resolvedName)) {
      resolvedName = await resolvedName();
    }

    if (typeOf(resolvedName) === "undefined" || typeOf(resolvedName) === "null") {
      return "";
    }

    if (typeOf(resolvedName) === "array" || typeOf(resolvedName) === "symbol") {
      return resolvedName.toString();
    }

    if (typeOf(resolvedName) === "object") {
      return JSON.stringify(resolvedName);
    }

    return resolvedName as string;
  } catch (error) {
    return "";
  }
}
