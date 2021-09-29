import { isString } from ".";

export function resolveColor(color: corde.ColorResolvable) {
  if (color > 0 && color < 0xffffff) {
    return +color;
  }

  if (isString(color) && color.includes("#")) {
    return parseInt(color.toString().replace("#", ""), 16);
  }

  if (Array.isArray(color)) {
    // tslint:disable-next-line: no-bitwise
    return (color[0] << 16) + (color[1] << 8) + color[2];
  }

  const value = corde.ColorsHex[color as keyof typeof corde.ColorsHex];
  if (value) {
    return value;
  }

  return -1;
}
