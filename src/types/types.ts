import { ColorResolvable, Message, MessageEmbed, Snowflake } from "discord.js";
import { Colors, RolePermission } from "..";
import { CordeBot } from "../core";

export type messageType = "text" | "embed";
export type messageOutputType = Message | MinifiedEmbedMessage;
export type messageExpectationType = string | MessageEmbed;
export type testFunctionType = (cordeBot: CordeBot) => Promise<TestReport>;
export type VoidPromiseFunction = () => void | Promise<void>;
export type GenericFunction = (...args: any[]) => any;
export type Primitive = number | bigint | string | boolean;

/**
 * Get all function `T` parameters as they may be
 * optional.
 */
export type ParametersAsOptional<T extends GenericFunction> = Parameters<T> | void[];

/**
 * Available types of config files
 */
export type configFileType = "js" | "json" | "ts";

/**
 * Represents **command** structure
 */
export interface AssertionProps {
  commandName: string;
  expectation: messageExpectationType;
  usingTrueStatement: boolean;
  output?: messageOutputType;
  messageType: messageType;
}

/**
 * Contain all tests cases | groups of a test file.
 */
export interface TestFile {
  path: string;
  groups: Group[];
  isEmpty: boolean;
}

/**
 * Represents **test** structure
 */
export interface Test {
  name?: string | number | boolean;
  subTests?: Test[];
  testsFunctions: testFunctionType[];
  testsReports?: TestReport[];
}

/**
 * Represents **group** structure
 */
export interface Group {
  name?: string | number | boolean;
  subGroups?: Group[];
  tests: Test[];
}

export interface RoleData {
  name?: string;
  id?: Snowflake;
}

export interface BaseRole {
  name?: string;
  color?: ColorResolvable | Colors;
  isHoist?: boolean;
  position?: number;
  permissions?: RolePermission;
  isMentionable?: boolean;
}

/**
 * Contains a set of properties needed for execution of corde
 */
export interface ConfigOptions {
  /**
   * Fake bot used to test the really one
   */
  cordeTestToken?: string;
  /**
   * User's bot that will be tested
   */
  botTestId?: string;
  /**
   * User's bot token that will run.
   */
  botTestToken?: string;
  /**
   * Channel where tests will run
   */
  channelId?: string;
  /**
   * Guild where tests will run
   */
  guildId?: string;
  /**
   * Defines max amount of time that a command can run
   */
  timeOut?: number;
  /**
   * Defines how identify bot calls
   */
  botPrefix?: string;
  /**
   * Path for case tests. Use this from the base directory of the application
   */
  testFiles?: string[];
}

export interface Author {
  icon_url: string;
  name: string;
  url: string;
}

export interface Field {
  name: string;
  inline: boolean;
  value: string;
}

export interface Image {
  url: string;
}

export interface Thumbnail {
  url: string;
}

export interface MinifiedEmbedMessage {
  author: Author;
  color: number;
  description: string;
  fields: Field[];
  footer?: any;
  image: Image;
  thumbnail: Thumbnail;
  timestamp?: any;
  title: string;
  type: string;
  url: string;
}

export interface MessageData {
  /**
   * We recommend to use **id** for message search.
   */
  text?: string;
  id?: string;
}

export interface TestReport {
  readonly pass: boolean;
  readonly message?: string;
}

export interface SemiRunnerReport {
  totalTests: number;
  totalEmptyTests: number;
  totalEmptyTestFiles: number;
  totalTestFiles: number;
  totalTestsPassed: number;
  totalTestsFailed: number;
  totalTestFilesPassed: number;
  totalTestFilesFailed: number;
}

export interface RunnerReport extends SemiRunnerReport {
  testTimer: string;
}
