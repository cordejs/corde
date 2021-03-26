import { BitField } from "discord.js";
import { Colors, ColorsHex } from "../utils";

export type Base64Resolvable = Buffer | string;

export type VerificationLevelType = "NONE" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";

/**
 * @see https://discord.com/developers/docs/resources/guild#guild-object-verification-level
 */
export enum VerificationLevel {
  /**
   * Unrestricted
   */
  NONE = "NONE",
  /**
   * Must have verified email on account
   */
  LOW = "LOW",
  /**
   * Must be registered on Discord for longer than 5 minutes
   */
  MEDIUM = "MEDIUM",
  /**
   * Must be a member of the server for longer than 10 minutes
   */
  HIGH = "HIGH",
  /**
   * Must have a verified phone number
   */
  VERY_HIGH = "VERY_HIGH",
}

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

/**
 * @see https://discord.com/developers/docs/resources/guild#guild-object-guild-features
 */
export type GuildFeaturesType =
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

/**
 * Defines Guild's features
 *
 * @see https://discord.com/developers/docs/resources/guild#guild-object-guild-features
 */
export enum GuildFeatures {
  /**
   * Guild has access to set an invite splash background
   */
  INVITE_SPLASH = "INVITE_SPLASH",
  /**
   * Guild has access to set 384kbps bitrate in voice (previously VIP voice servers)
   */
  VIP_REGIONS = "VIP_REGIONS",
  /**
   * Guild has access to set a vanity URL
   */
  VANITY_URL = "VANITY_URL",
  /**
   * Guild is verified
   */
  VERIFIED = "VERIFIED",
  /**
   * Guild is partnered
   */
  PARTNERED = "PARTNERED",
  /**
   * Guild can enable welcome screen, Membership Screening, and discovery, and receives community updates
   */
  COMMUNITY = "COMMUNITY",
  /**
   * Guild has access to use commerce features (i.e. create store channels)
   */
  COMMERCE = "COMMERCE",
  /**
   * Guild has access to create news channels
   */
  NEWS = "NEWS",
  /**
   * Guild is able to be discovered in the directory
   */
  DISCOVERABLE = "DISCOVERABLE",
  /**
   * Guild is able to be featured in the directory
   */
  FEATURABLE = "FEATURABLE",
  /**
   * Guild has access to set an animated guild icon
   */
  ANIMATED_ICON = "ANIMATED_ICON",
  /**
   * Guild has access to set a guild banner image
   */
  BANNER = "BANNER",
  /**
   * Guild has enabled the welcome screen
   */
  WELCOME_SCREEN_ENABLED = "WELCOME_SCREEN_ENABLED",
  /**
   * Guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object)
   */
  MEMBER_VERIFICATION_GATE_ENABLED = "MEMBER_VERIFICATION_GATE_ENABLED",
  /**
   * Guild can be previewed before joining via Membership Screening or the directory
   */
  PREVIEW_ENABLED = "PREVIEW_ENABLED",
}

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

/**
 * System channel flags of Discord
 *
 * @see https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags
 */
export enum SystemChannelFlag {
  /**
   * Suppress member join notifications
   */
  SUPPRESS_JOIN_NOTIFICATIONS = "SUPPRESS_JOIN_NOTIFICATIONS",
  /**
   * Suppress server boost notifications
   */
  SUPPRESS_PREMIUM_SUBSCRIPTIONS = "SUPPRESS_PREMIUM_SUBSCRIPTIONS",
}
