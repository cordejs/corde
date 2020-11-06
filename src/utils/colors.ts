import { ColorResolvable } from "discord.js";

export enum ColorsHex {
  DEFAULT = 0x000000,
  WHITE = 0xffffff,
  AQUA = 0x1abc9c,
  GREEN = 0x2ecc71,
  BLUE = 0x3498db,
  YELLOW = 0xffff00,
  PURPLE = 0x9b59b6,
  LUMINOUS_VIVID_PINK = 0xe91e63,
  GOLD = 0xf1c40f,
  ORANGE = 0xe67e22,
  RED = 0xe74c3c,
  GREY = 0x95a5a6,
  NAVY = 0x34495e,
  DARK_AQUA = 0x11806a,
  DARK_GREEN = 0x1f8b4c,
  DARK_BLUE = 0x206694,
  DARK_PURPLE = 0x71368a,
  DARK_VIVID_PINK = 0xad1457,
  DARK_GOLD = 0xc27c0e,
  DARK_ORANGE = 0xa84300,
  DARK_RED = 0x992d22,
  DARK_GREY = 0x979c9f,
  DARKER_GREY = 0x7f8c8d,
  LIGHT_GREY = 0xbcc0c0,
  DARK_NAVY = 0x2c3e50,
  BLURPLE = 0x7289da,
  GREYPLE = 0x99aab5,
  DARK_BUT_NOT_BLACK = 0x2c2f33,
  NOT_QUITE_BLACK = 0x23272a,
}

export enum Colors {
  DEFAULT = "#000000",
  WHITE = "#FFFFFF",
  AQUA = "#1ABC9C",
  GREEN = "#2ECC71",
  BLUE = "#3498DB",
  PURPLE = "#9B59B6",
  GOLD = "#E91E63",
  ORANGE = "#E67E22",
  RED = "#E74C3C",
  GREY = "#95A5A6",
  DARKER_GREY = "#7F8C8D",
  NAVY = "#34495E",
  DARK_AQUA = "#11806A",
  DARK_GREEN = "#1F8B4C",
  DARK_BLUE = "#206694",
  DARK_PURPLE = "#71368A",
  DARK_GOLD = "#C27C0E",
  DARK_ORANGE = "#A84300",
  DARK_RED = "#992D22",
  DARK_GREY = "#7F8C8D",
  LIGHT_GREY = "#BCC0C0",
  DARK_NAVY = "#2C3E50",
  LUMINOUS_VIVID_PINK = "#E91E63",
  DARK_VIVID_PINK = "#AD1457",
}

export function resolveColor(color: ColorResolvable) {
  if (typeof color === "string" || typeof color === "number") {
    if (color === "DEFAULT") return 0;
    return (
      ColorsHex[color as keyof typeof ColorsHex] || parseInt(color.toString().replace("#", ""), 16)
    );
  } else if (Array.isArray(color)) {
    // tslint:disable-next-line: no-bitwise
    return (color[0] << 16) + (color[1] << 8) + color[2];
  }
  return -1;
}
