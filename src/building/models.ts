import { MessageEmbed } from 'discord.js';

export type messageType = 'text' | 'embed';
export type messageOutputType = string | MinifiedEmbedMessage;
export type messageExpectationType = string | MessageEmbed;

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
  assertions: AssertionProps[];
}

/**
 * Represents **group** structure
 */
export interface Group {
  name?: string;
  subGroups?: Group[];
  tests: Test[];
}

export interface LogOut {}

export interface Author {
  icon_url: string;
  name: string;
  url: string;
}

export interface Field {
  inline: boolean;
  name: string;
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
  shouldReturn(expect: string | MessageEmbed): void;
  /**
   * Defines the message **not** expected to be returned by a
   * command.
   *
   * @param expect A message that **should not be** returned by a bot after invoke a command
   */
  shouldNotReturn(notExpect: string | MessageEmbed): void;
}
