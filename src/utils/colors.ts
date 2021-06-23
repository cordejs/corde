import { ColorResolvable } from "discord.js";
import { ColorsHex } from "../types";

export function resolveColor(color: ColorResolvable) {
  if (color > 0 && color < 0xffffff) {
    return +color;
  }

  if (typeof color === "string" && color.includes("#")) {
    return parseInt(color.toString().replace("#", ""), 16);
  }

  if (Array.isArray(color)) {
    // tslint:disable-next-line: no-bitwise
    return (color[0] << 16) + (color[1] << 8) + color[2];
  }

  const value = ColorsHex[color as keyof typeof ColorsHex];
  if (value) {
    return value;
  }

  return -1;
}
