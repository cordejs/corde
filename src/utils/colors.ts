import { ColorResolvable } from "discord.js";

export enum Colors {
  DEFAULT = 0,
  AQUA = 1752220,
  GREEN = 3066993,
  BLUE = 3447003,
  PURPLE = 10181046,
  GOLD = 15844367,
  ORANGE = 15105570,
  RED = 15158332,
  GREY = 9807270,
  DARKER_GREY = 8359053,
  NAVY = 3426654,
  DARK_AQUA = 1146986,
  DARK_GREEN = 2067276,
  DARK_BLUE = 2123412,
  DARK_PURPLE = 7419530,
  DARK_GOLD = 12745742,
  DARK_ORANGE = 11027200,
  DARK_RED = 10038562,
  DARK_GREY = 9936031,
  LIGHT_GREY = 12370112,
  DARK_NAVY = 2899536,
  LUMINOUS_VIVID_PINK = 16580705,
  DARK_VIVID_PINK = 12320855,
}

export function resolveColor(color: ColorResolvable): number {
  if (typeof color === "number" || +color) {
    if (Object.values(Colors).filter((v) => v === +color).length > 0) {
      return +color;
    }
  } else {
    const colorTyped = color as keyof typeof Colors;
    if (Colors[colorTyped]) {
      return Colors[colorTyped];
    }
  }

  return -1;
}
