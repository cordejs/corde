import { AsymmetricMatcher } from "../expect/asymmetricMatcher";
import { typeOf } from "./typeOf";

/**
 * Same of `typeOf`, but treats asymmetric instances too.
 *
 * @internal
 */
export function asymmetricTypeOf(value: any) {
  if (value instanceof AsymmetricMatcher) {
    return value.toString();
  }

  return typeOf(value);
}
