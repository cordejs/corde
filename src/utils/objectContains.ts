type KeyValue = {
  [key: string]: any;
};

type PartialWithAnyValue<T> = Partial<T> & KeyValue;

/**
 *
 * @param holder
 * @param sample
 * @returns
 */
export function objectMatches<T extends unknown>(
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
      const result = objectMatches(holderProp, sampleProp);
      if (!result) {
        return false;
      }
    } else if (holderProp !== sampleProp) {
      return false;
    }
  }

  return true;
}
