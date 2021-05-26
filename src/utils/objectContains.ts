/**
 *
 * @param holder
 * @param sample
 * @returns
 */
export function objectMatches(sample: unknown, holder: unknown) {
  // Create arrays of property names
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
