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
