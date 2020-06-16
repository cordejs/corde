import { MessageEmbed } from 'discord.js';
import CordeBot from './core/cordeBot';

export type messageType = 'text' | 'embed';
export type messageOutputType = string | MinifiedEmbedMessage;
export type messageExpectationType = string | MessageEmbed;
export type testFunctionType = (cordeBot: CordeBot) => Promise<TestReport>;
/**
 * Available types of config files
 */
export type configFileType = 'js' | 'json' | 'ts';

export interface TestReport {
  commandName: string;
  expectation: string;
  output: string;
  testSucessfully: boolean;
  isTrueMacther: boolean;
  showExpectAndOutputValue: boolean;
}

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
 * Represents **test** structure
 */
export interface Test {
  name?: string;
  subTests?: Test[];
  testsFunctions: testFunctionType[];
  testsReports?: TestReport[];
}

/**
 * Represents **group** structure
 */
export interface Group {
  name?: string;
  subGroups?: Group[];
  tests: Test[];
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

/**
 * Defines all functions that can be used
 * to check a bot reaction of a command.
 */
export interface Matches {
  /**
   * Defines the message expected to be returned by a
   * command.
   *
   * @param expect A message returned by a bot after invoke a command
   */
  mustReturn(expect: string | MessageEmbed): void;
  /**
   * Defines the message **not** expected to be returned by a
   * command.
   *
   * @param expect A message that **should not be** returned by a bot after invoke a command
   */
  mustNotReturn(notExpect: string | MessageEmbed): void;
}

export interface MatchesWithNot extends Matches {
  not: Matches;
}

/**
 * Contains a set of properties needed for execution of corde
 */
export default interface ConfigOptions {
  /**
   * Fake bot used to test the realy one
   */
  cordeTestToken: string;
  /**
   * User's bot that will be tested
   */
  botTestId: string;
  /**
   * User's bot token that will run.
   */
  botTestToken?: string;
  /**
   * Channel where tests will run
   */
  channelId: string;
  /**
   * Guild where tests will run
   */
  guildId: string;
  /**
   * Defines max amount of time that a command can run
   */
  timeOut?: number;
  /**
   * Defines how indentify bot calls
   */
  botPrefix: string;
  /**
   * Path for case tests. Use this from the base directory of the application
   */
  testFilesDir: string;
}
