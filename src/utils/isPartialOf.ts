type KeyValue = {
  [key: string]: any;
};

type PartialWithAnyValue<T> = Partial<T> & KeyValue;

/**
 * Verify if a `sample` object matches with properties of a `holder` object.
 *
 * @example
 *
 * const objA = {
 *    abc: 1
 * }
 *
 * // matches with
 *
 * const objB = {
 *    abc: 1,
 *    a: 2
 * }
 *
 * isPartialOf(objA, objB); // True
 *
 * // Because objA has property abc, which exists in objB too.
 * // But the follow example fails
 *
 * isPartialOf(objB, objA); // False
 *
 * // It fails because property 'a' does not exists in objA.
 *
 * @param sample Partial object of `holder`
 * @param holder "Original" object wich contains all properties that `sample` should have in part
 * @returns If object `sample` has properties of `holder`
 */
export function isPartialOf<T extends unknown>(
  sample: PartialWithAnyValue<T> & KeyValue,
  holder: T,
) {
  if (!sample && !holder) {
    return true;
  }

  if ((!sample && holder) || (sample && !holder)) {
    return false;
  }

  const sampleProps = Object.getOwnPropertyNames(sample);

  for (let i = 0; i < sampleProps.length; i++) {
    const propName = sampleProps[i];

    const sampleProp = (sample as any)[propName];
    const holderProp = (holder as any)[propName];

    if (typeof sampleProp === "object") {
      const result = isPartialOf(holderProp, sampleProp);
      if (!result) {
        return false;
      }
    } else if (holderProp !== sampleProp) {
      return false;
    }
  }

  return true;
}
