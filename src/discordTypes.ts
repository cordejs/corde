import { BitField } from "discord.js";
import { Colors, ColorsHex } from "./utils";

export type Base64Resolvable = Buffer | string;
export type VerificationLevel = "NONE" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";

export type ColorResolvable =
  | "DEFAULT"
  | "WHITE"
  | "AQUA"
  | "GREEN"
  | "BLUE"
  | "YELLOW"
  | "PURPLE"
  | "LUMINOUS_VIVID_PINK"
  | "GOLD"
  | "ORANGE"
  | "RED"
  | "GREY"
  | "DARKER_GREY"
  | "NAVY"
  | "DARK_AQUA"
  | "DARK_GREEN"
  | "DARK_BLUE"
  | "DARK_PURPLE"
  | "DARK_VIVID_PINK"
  | "DARK_GOLD"
  | "DARK_ORANGE"
  | "DARK_RED"
  | "DARK_GREY"
  | "LIGHT_GREY"
  | "DARK_NAVY"
  | "BLURPLE"
  | "GREYPLE"
  | "DARK_BUT_NOT_BLACK"
  | "NOT_QUITE_BLACK"
  | "RANDOM"
  | [number, number, number]
  | number
  | ColorsHex
  | Colors
  | string;

export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
export type AllowedImageFormat = "webp" | "png" | "jpg" | "jpeg" | "gif";

export type GuildFeatures =
  | "ANIMATED_ICON"
  | "BANNER"
  | "COMMERCE"
  | "COMMUNITY"
  | "DISCOVERABLE"
  | "FEATURABLE"
  | "INVITE_SPLASH"
  | "NEWS"
  | "PARTNERED"
  | "RELAY_ENABLED"
  | "VANITY_URL"
  | "VERIFIED"
  | "VIP_REGIONS"
  | "WELCOME_SCREEN_ENABLED";

export type RecursiveReadonlyArray<T> = ReadonlyArray<T | RecursiveReadonlyArray<T>>;
export type SystemChannelFlagsString = "WELCOME_MESSAGE_DISABLED" | "BOOST_MESSAGE_DISABLED";
export type SystemChannelFlagsResolvable = BitFieldResolvable<SystemChannelFlagsString>;

export type BitFieldResolvable<T extends string> =
  | RecursiveReadonlyArray<T | number | Readonly<BitField<T>>>
  | T
  | number
  | Readonly<BitField<T>>;

export interface ImageURLOptions {
  format?: AllowedImageFormat;
  size?: ImageSize;
}
