// https://stackoverflow.com/a/11866980/6769933

/**
 * Converts a number to RGBA format.
 *
 * @example
 *
 * rgba(-5952982); // 165,42,42,1
 * rgba(-12525360) // 64,224,208,1
 *
 * @param value color as number
 * @returns RGBA format of the number
 * @internal
 */
export function rgba(value: number): [number, number, number, number] {
  if (typeof value !== "number") {
    return null;
  }

  value >>>= 0;
  const b = value & 0xff;
  const g = (value & 0xff00) >>> 8;
  const r = (value & 0xff0000) >>> 16;
  const a = ((value & 0xff000000) >>> 24) / 255;

  return [r, g, b, a];
}
